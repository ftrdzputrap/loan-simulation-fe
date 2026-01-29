<template>
  <div class="max-w-md p-6 border rounded-lg">
    <h1 class="text-lg font-semibold mb-4">
      Edit Tenor
    </h1>

    <div v-if="isLoading" class="text-gray-500">
      Loading...
    </div>

    <form v-else @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label class="block text-sm mb-1">
          Tenor (Bulan)
        </label>
        <input v-model.number="form.month" type="number" min="1" class="w-full px-3 py-2 border rounded" />
      </div>

      <div class="flex justify-end gap-2">
        <button type="button" class="px-4 py-2 border rounded" @click="goBack">
          Batal
        </button>

        <button type="submit" class="px-4 py-2 bg-gray-900 text-white rounded" :disabled="isPending">
          {{ isPending ? "Menyimpan..." : "Simpan" }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useMutation, useQuery } from "@tanstack/vue-query";
import { reactive, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getTenorDetail, putTenor } from "../../services/tenor.service";

const route = useRoute();
const router = useRouter();

const id = route.params.id as string;

const form = reactive({
  month: 0,
});

const { data, isLoading } = useQuery({
  queryKey: ["users", id],
  queryFn: ({ queryKey }) => getTenorDetail(queryKey?.[1] as string),
});

const { mutate, isPending } = useMutation({ mutationFn: (payload: { month: number }) => putTenor(id, payload) });

watch(
  () => data.value,
  (val) => {
    if (val) {
      form.month = val?.data?.month;
    }
  },
  { immediate: true }
);

function handleSubmit() {
  mutate(
    {
      month: form.month,
    },
    {
      onSuccess: () => {
        router.push("/tenor");
      },
    }
  );
}

function goBack() {
  router.back();
}
</script>
