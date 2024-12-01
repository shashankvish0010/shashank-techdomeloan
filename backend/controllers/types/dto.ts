export interface manageLoanData {
  id: string;
  loan_amount: number;
  loan_paid: boolean;
  term_duration: number;
  approved_date: string;
  term_paid: number;
  repayment_amount: number;
  repayment_dates: string[];
}
