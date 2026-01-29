<template>
  <div class="max-w-md p-6 border rounded">
    <h1 class="text-lg font-semibold mb-4">
      Create Loan
    </h1>

    <LoanForm :loading="isPending" @submit="handleSubmit" @cancel="router.back()" />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useMutation } from "@tanstack/vue-query";
import { createLoan } from "../../services/loan.service";
import LoanForm from "../../components/LoanForm.vue";

const router = useRouter();
const { mutate, isPending } = useMutation({ mutationFn: createLoan });

function handleSubmit(payload: any) {
  mutate(payload, {
    onSuccess: () => {
      router.push("/loan");
    },
  });
}
</script>
