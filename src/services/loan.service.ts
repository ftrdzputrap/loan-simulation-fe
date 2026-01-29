import api from "../../api";
import type { TReq } from "../helpers/types";
import type { Loan } from "../interfaces/loan";

export async function getLoans(params: TReq) {
  const { data } = await api.get("/loans", { params });
  return data;
}

export async function getLoanDetail(id: string) {
  const { data } = await api.get(`/loans/${id}`);
  return data;
}

export async function createLoan(payload: Omit<Loan, "id">) {
  return api.post("/loans", payload);
}

export async function updateLoan(
  id: string,
  payload: Omit<Loan, "id">
) {
  return api.put(`/loans/${id}`, payload);
}

export async function deleteLoan(id: string) {
  return api.delete(`/loans/${id}`);
}

export async function payLoan(id: string, body: { loanId: string; billingId: string; amount: string }) {
  const { data } = await api.put(`/loans/${id}`, body);
  return data;
}