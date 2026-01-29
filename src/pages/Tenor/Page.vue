<template>
  <div class="p-6">
    <div class="flex items-center justify-between">
      <h1 class="text-xl font-semibold mb-4">Tenor List</h1>
      <Button @click="router.push('/tenor/create')">Create New</Button>
    </div>

    <div class="overflow-x-auto">
      <BaseTable :columns="columns" :rows="data?.data" :meta="data?.meta" :loading="isLoading"
        @changePage="handleChangePage">
        <template #cell-id="{ value }">
          <div class="space-x-1">
            <Button @click="handleDelete(value)">Delete</Button>
            <Button @click="router.push(`/tenor/edit/${value}`)">Edit</Button>
          </div>
        </template>
      </BaseTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useMutation, useQuery } from '@tanstack/vue-query';

import BaseTable from '../../components/table/BaseTable.vue';
import { deleteTenor, getTenor } from '../../services/tenor.service';
import { getPagination } from '../../helpers/utils';
import { useRouter } from 'vue-router';
import type { TReq } from '../../helpers/types';
import Button from '../../components/ui/Button.vue';

const router = useRouter();

const page = ref(1);
const limit = ref(5);

const queryParams = computed<TReq>(() => ({
  page: page.value,
  limit: limit.value,
}));

const { data, isLoading, refetch } = useQuery({
  queryKey: ["users", queryParams],
  queryFn: ({ queryKey }) => getTenor(queryKey?.[1] as TReq),
});
const { mutate } = useMutation({ mutationFn: deleteTenor });

const columns = [
  {
    key: "number",
    label: "No.",
    className: "w-10",
    render: ({ index }: { index: number }) => getPagination(data.value.meta, index),
  },
  {
    key: "month",
    label: "Bulan",
    render: ({ value }: { value: string }) => `${value} Bulan`,
  },
  {
    key: "id",
    label: "Aksi",
    className: "w-40"
  },
];

const handleChangePage = (newPage: number) => {
  page.value = newPage;
}

const handleDelete = (id: string) => {
  mutate(id, { onSuccess: refetch })
}

</script>
