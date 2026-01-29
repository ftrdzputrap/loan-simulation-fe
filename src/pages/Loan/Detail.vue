<template>
  <div class="p-6 border rounded-lg space-y-6">
    <div class="border rounded p-4 bg-gray-50">
      <h2 class="font-medium mb-3">
        Form Pembayaran
      </h2>

      <div class="grid grid-cols-3 gap-4">
        <div>
          <label class="text-sm">Bulan</label>
          <select v-model="selectedInstallmentId" class="w-full border px-3 py-2 rounded">
            <option value="" disabled>Pilih Bulan</option>
            <option v-for="item in unpaidInstallments" :key="item.id" :value="item.id">
              Bulan {{ item.monthNumber }}
            </option>
          </select>
        </div>

        <div>
          <label class="text-sm">Nominal Pembayaran</label>
          <input type="number" v-model.number="paymentAmount" class="w-full border px-3 py-2 rounded"
            :max="selectedInstallment?.amountDue" />
        </div>

        <div class="flex items-end">
          <button class="w-full px-4 py-2 bg-black text-white rounded disabled:opacity-50" :disabled="!canSubmit"
            @click="submitPayment">
            Bayar
          </button>
        </div>
      </div>

      <div v-if="selectedInstallment" class="mt-3 text-sm text-gray-600">
        Harus dibayar:
        <b>{{ formatCurrency(selectedInstallment.amountDue) }}</b>
      </div>
    </div>

    <table class="min-w-full text-sm border">
      <thead class="bg-gray-100">
        <tr>
          <th class="px-4 py-3 text-left border-b">Bulan</th>
          <th class="px-4 py-3 text-right border-b">Harus Dibayar</th>
          <th class="px-4 py-3 text-right border-b">Sudah Dibayar</th>
          <th class="px-4 py-3 text-center border-b">Status</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in rows" :key="item.id" class="hover:bg-gray-50">
          <td class="px-4 py-3 border-b">
            Bulan {{ item.monthNumber }}
          </td>

          <td class="px-4 py-3 border-b text-right">
            {{ formatCurrency(item.amountDue) }}
          </td>

          <td class="px-4 py-3 border-b text-right">
            {{ formatCurrency(item.amountPaid) }}
          </td>

          <td class="px-4 py-3 border-b text-center font-medium">
            <span v-if="item.amountPaid >= item.amountDue" class="text-green-600">
              LUNAS
            </span>
            <span v-else class="text-red-600">
              BELUM LUNAS
            </span>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="text-sm text-gray-600">
      Total Lunas:
      <b>{{ totalPaid }}</b> / {{ rows?.length }} bulan
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { useMutation, useQuery } from "@tanstack/vue-query";
import { getLoanDetail, payLoan } from "../../services/loan.service";

const route = useRoute();

const id = route.params.id as string;

const { data, refetch } = useQuery({
  queryKey: ["users", id],
  queryFn: ({ queryKey }) => getLoanDetail(queryKey?.[1] as string),
});
const { mutate } = useMutation({ mutationFn: (payload: any) => payLoan(id, payload) })

const rows = computed(() =>
  data?.value?.data?.transactions.map((i: { amountPaid: number; amountDue: number }) => ({
    ...i,
    amountDue: Number(i.amountDue),
    amountPaid: Number(i.amountPaid),
  }))
)

const selectedInstallmentId = ref<number | "">("")
const paymentAmount = ref<number>(0)

const selectedInstallment = computed(() =>
  rows.value?.find((i: { id: string }) => i.id === selectedInstallmentId.value)
)

const unpaidInstallments = computed(() =>
  rows.value?.filter((i: { amountPaid: number; amountDue: number }) => i.amountPaid < i.amountDue)
)

const canSubmit = computed(() =>
  !!selectedInstallment.value &&
  paymentAmount.value > 0 &&
  paymentAmount.value === selectedInstallment.value.amountDue
)

function submitPayment() {
  mutate({ loanId: id, billingId: selectedInstallmentId.value, amount: paymentAmount.value }, {
    onSuccess: () => {
      refetch()
      paymentAmount.value = 0
      selectedInstallmentId.value = "";
    }
  })
}

const totalPaid = computed(() =>
  rows.value?.filter((i: { amountPaid: number; amountDue: number }) => i.amountPaid >= i.amountDue)?.length
)

function formatCurrency(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value)
}
</script>
