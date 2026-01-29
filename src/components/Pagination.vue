<template>
  <div class="flex items-center justify-between gap-4 text-sm">
    <span class="text-gray-600">
      Page {{ page }} of {{ totalPage }}
    </span>

    <div class="flex items-center gap-1">
      <button class="px-3 py-1 border rounded disabled:opacity-50" :disabled="page === 1" @click="changePage(page - 1)">
        Prev
      </button>

      <button v-for="p in pages" :key="p" class="px-3 py-1 border rounded" :class="p === page
        ? 'bg-gray-900 text-white border-gray-900'
        : 'hover:bg-gray-100'
        " @click="changePage(p)">
        {{ p }}
      </button>

      <button class="px-3 py-1 border rounded disabled:opacity-50" :disabled="page === totalPage"
        @click="changePage(page + 1)">
        Next
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  page: number;
  pageSize: number;
  total: number;
  maxVisible?: number;
}>();

const emit = defineEmits<{
  (e: "update:page", value: number): void;
}>();

const totalPage = computed(() =>
  Math.max(1, Math.ceil(props.total / props.pageSize))
);

const maxVisible = computed(() => props.maxVisible ?? 5);

const pages = computed(() => {
  const half = Math.floor(maxVisible.value / 2);
  let start = Math.max(1, props.page - half);
  let end = Math.min(totalPage.value, start + maxVisible.value - 1);

  if (end - start + 1 < maxVisible.value) {
    start = Math.max(1, end - maxVisible.value + 1);
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
});

function changePage(p: number) {
  if (props?.page < 1 || props?.page > totalPage.value) return;
  emit("update:page", p);
}
</script>
