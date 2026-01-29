export type TMeta = {
  currentPage: number
  firstPage: number
  firstPageUrl: string
  lastPage: number
  lastPageUrl: string
  nextPageUrl: null
  perPage: number
  previousPageUrl: string
  total: number
}

export type TReq = {
  page: number;
  limit: number;
}
