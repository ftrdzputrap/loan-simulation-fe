<template>
  <table class="min-w-full text-sm border">
    <thead class="bg-gray-100">
      <tr>
        <th v-for="column in columns" :key="column.key"
          :class="clsx('px-4 py-3 text-left font-medium text-gray-700 border-b not-last:border-r', column.className)">
          {{ column.label }}
        </th>
      </tr>
    </thead>

    <tbody>
      <tr v-if="loading">
        <td :colspan="columns?.length" class="px-4 py-6 text-center text-gray-500">
          Loading...
        </td>
      </tr>

      <tr v-else-if="rows?.length === 0">
        <td :colspan="columns?.length" class="px-4 py-6 text-center text-gray-500">
          No data available
        </td>
      </tr>

      <tr v-else v-for="(row, rowIndex) in rows" :key="rowIndex" class="hover:bg-gray-50">
        <td v-for="column in columns" :key="column.key" class="px-4 py-3 border-b not-last:border-r">
          <component v-if="column.render" :is="renderCell(column, row, rowIndex)" />

          <slot v-else :name="`cell-${column.key as string}`" :value="row[column.key]" :row="row" :index="rowIndex">
            {{ row[column.key] }}
          </slot>
        </td>
      </tr>
    </tbody>
  </table>
  <BasePagination class="mt-4" :page="meta?.currentPage ?? 1" :page-size="meta?.perPage ?? 10" :total="meta?.total ?? 0"
    @update:page="emit('changePage', $event)" />
</template>

<script setup lang="ts">
import clsx from 'clsx';
import type { TMeta } from '../../helpers/types';
import BasePagination from "./../Pagination.vue";

type TTableColumn<T = any> = {
  key: keyof T | string;
  label: string;
  className?: string;
  render?: (payload: {
    value: any;
    row: T;
    index: number;
  }) => any;
};

const props = defineProps<{
  columns: TTableColumn[];
  rows: any[];
  loading?: boolean;
  meta?: TMeta;
}>();

const emit = defineEmits<{
  (e: "changePage", page: number): void;
}>();

function renderCell(column: TTableColumn, row: any, index: number) {
  return {
    render() {
      return column.render?.({
        value: row[column.key],
        row,
        index,
      });
    },
  };
}
</script>
