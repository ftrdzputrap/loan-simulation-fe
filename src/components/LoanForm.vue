<!-- components/LoanForm.vue -->
<template>
  <form @submit.prevent="onSubmit" class="space-y-4">
    <div>
      <label class="text-sm">Jumlah</label>
      <select v-model="form.userId" class="w-full border px-3 py-2 rounded">
        <option value="" disabled>
          Pilih User
        </option>

        <option v-for="option in users?.data" :key="option.id" :value="option.id">
          {{ option.fullName }}
        </option>
      </select>
    </div>

    <div>
      <label class="text-sm">Jumlah</label>
      <input type="number" v-model.number="form.amount" class="w-full border px-3 py-2 rounded" />
    </div>

    <div>
      <label class="text-sm">Tenor (Bulan)</label>
      <select v-model="form.tenorId" class="w-full border px-3 py-2 rounded">
        <option value="" disabled>
          Pilih Tenor
        </option>

        <option v-for="option in tenors?.data" :key="option.id" :value="option.id">
          {{ option.month }}
        </option>
      </select>
    </div>

    <div>
      <label class="text-sm">Gaji per bulan</label>
      <input type="number" v-model.number="form.salaryPerMonth" class="w-full border px-3 py-2 rounded" />
    </div>

    <div class="flex justify-end gap-2">
      <button type="button" class="px-4 py-2 border" @click="$emit('cancel')">
        Batal
      </button>
      <button type="submit" class="px-4 py-2 bg-gray-900 text-white" :disabled="loading">
        {{ loading ? "Saving..." : "Simpan" }}
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import { reactive, watch } from "vue";
import { getUser } from "../services/user.service";
import { getAllTenor } from "../services/tenor.service";

interface Props {
  modelValue?: {
    userId: string,
    tenorId: string,
    amount: number,
    salaryPerMonth: number,
  };
  loading?: boolean;
}

const { data: users } = useQuery({
  queryKey: ["users"],
  queryFn: () => getUser(),
});

const { data: tenors } = useQuery({
  queryKey: ["tenorAll"],
  queryFn: () => getAllTenor(),
});

const props = defineProps<Props>();
const emit = defineEmits<{
  submit: [value: Props["modelValue"]];
  cancel: [];
}>();

const form = reactive({
  userId: "",
  tenorId: "",
  amount: 0,
  salaryPerMonth: 0,
});

watch(
  () => props.modelValue,
  (val) => {
    if (val) Object.assign(form, val);
  },
  { immediate: true }
);

function onSubmit() {
  emit("submit", { ...form });
}
</script>
