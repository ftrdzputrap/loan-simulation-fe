import type { TMeta } from "./types"

export const getPagination = (meta: TMeta, index: number) => {
  if (!meta) return 1
  const { currentPage, perPage } = meta

  return (currentPage - 1) * perPage + (index + 1)
}

export const getMessageFromResponse = (
  res: any,
  fallback = "Something went wrong"
): string => {
  if (!res) return fallback;

  if (res?.response?.data?.message) {
    return res.response.data.message;
  }

  if (res?.response?.data?.error?.message) {
    return res.response.data.error.message;
  }

  if (res?.data?.message) {
    return res.data.message;
  }

  if (res?.data?.error?.message) {
    return res.data.error.message;
  }

  if (typeof res === "string") {
    return res;
  }

  if (typeof res?.message === "string") {
    return res.message;
  }

  return fallback;
};