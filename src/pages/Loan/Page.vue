<template>
  <div>
    <div class="flex justify-between mb-4">
      <h1 class="text-lg font-semibold">Loan List</h1>
      <Button @click="router.push('/loan/create')">Create New</Button>
    </div>

    <BaseTable :columns="columns" :rows="data?.data" :loading="isLoading" @change-page="handleChangePage">
      <template #cell-id="{ value, row }">
        <div class="space-x-1" v-if="row.status === 'approved'">
          <Button @click="router.push(`/loan/${value}`)">Detail</Button>
        </div>
        <div v-else />
      </template>
    </BaseTable>
  </div>
</template>

<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import { computed, ref } from "vue";
import type { TReq } from "../../helpers/types";
import { getLoans } from "../../services/loan.service";
import BaseTable from "../../components/table/BaseTable.vue";
import { getPagination } from "../../helpers/utils";
import { useRouter } from "vue-router";
import Button from "../../components/ui/Button.vue";

const router = useRouter();

const page = ref(1);
const limit = ref(10);

const queryParams = computed<TReq>(() => ({
  page: page.value,
  limit: limit.value,
}));

const { data, isLoading } = useQuery({
  queryKey: ["users", queryParams],
  queryFn: ({ queryKey }) => getLoans(queryKey?.[1] as TReq),
});

console.log(data?.value)

const columns = [
  {
    key: "number",
    label: "No.",
    className: "w-10",
    render: ({ index }: { index: number }) => getPagination(data.value.meta, index),
  },
  {
    key: "loan",
    label: "Nama",
    render: ({ value }: { value: { user: { fullName: string } } }) => {
      return value?.user?.fullName
    }
  },
  {
    key: "loan",
    label: "Jumlah Pinjaman",
    render: ({ value }: { value: { amount: number } }) => {
      return value?.amount
    }
  },
  {
    key: "loan",
    label: "Tenor",
    render: ({ value }: { value: { tenorMonth: string } }) => {
      return `${value?.tenorMonth} Bulan`
    }
  },
  {
    key: "instalmentAmount",
    label: "Cicilan",
    render: ({ value }: { value: string }) => {
      return value
    }
  },
  {
    key: "status",
    label: "Status",
    render: ({ value }: { value: string }) => {
      return value
    }
  },
  {
    key: "id",
    label: "Aksi",
  },
];

const handleChangePage = (newPage: number) => {
  page.value = newPage;
}
</script>
