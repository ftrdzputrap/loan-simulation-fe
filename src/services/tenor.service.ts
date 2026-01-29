import type { TReq } from "../helpers/types";
import api from "./../../api";

export async function getTenor(params: TReq) {
  const { data } = await api.get(`/tenors`, { params });
  return data;
}

export async function getAllTenor() {
  const { data } = await api.get(`/tenors?type=all`);
  return data;
}

export async function getTenorDetail(id: string) {
  const { data } = await api.get(`/tenors/${id}`);
  return data;
}

export async function postTenor(body: { month: number | null }) {
  const { data } = await api.post(`/tenors`, body);
  return data;
}

export async function putTenor(id: string, body: { month: number | null }) {
  const { data } = await api.put(`/tenors/${id}`, body);
  return data;
}

export async function deleteTenor(id: string) {
  const { data } = await api.delete(`/tenors/${id}`);
  return data;
}
