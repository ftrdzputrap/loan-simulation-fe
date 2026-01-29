export interface Loan {
  id: string;
  name: string;
  amount: number;
  tenor: number;
}

export interface LoanListResponse {
  data: Loan[];
  total: number;
}