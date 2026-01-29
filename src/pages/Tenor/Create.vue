<template>
  <div class="max-w-md p-6 border rounded-lg">
    <h2 class="text-lg font-semibold mb-4">Form Tenor</h2>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Tenor (Bulan)
        </label>
        <input v-model.number="form.month" type="number" min="1" placeholder="Contoh: 12"
          class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-900" />
      </div>

      <div class="flex justify-end gap-2">
        <button type="button" class="px-4 py-2 border rounded hover:bg-gray-100" @click="resetForm">
          Reset
        </button>
        <button type="submit" class="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800">
          Simpan
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useMutation } from "@tanstack/vue-query";
import { reactive } from "vue";
import { postTenor } from "../../services/tenor.service";
import { useRouter } from "vue-router";

const router = useRouter();
const { mutate } = useMutation({ mutationFn: postTenor });

const form = reactive<{ month: number | null }>({
  month: null,
});

function handleSubmit() {
  mutate(form, {
    onSuccess: () => {
      router.back();
    },
  })
}

function resetForm() {
  form.month = null;
}
</script>
