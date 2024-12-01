export interface userType {
  firstname: string | undefined;
  lastname: string | undefined;
  user_email: string | undefined;
  user_password: string | undefined;
  confirm_password: string | undefined;
}

export interface adminType {
  firstname: string | undefined;
  lastname: string | undefined;
  admin_email: string | undefined;
  admin_password: string | undefined;
  confirm_password: string | undefined;
}

export interface userContextvalue {
  state: any;
  dispatch: any;
  user: userLoginType;
  message: string | undefined;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  login: boolean;
  loader: boolean;
  setLoader: any;
  curruser: any;
}

export interface adminContextvalue {
  state: any;
  dispatch: any;
  admin: adminLoginType;
  message: string | undefined;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  login: boolean;
  curruser: any;
  dataFetched: boolean;
  loader: boolean;
  setLoader: any;
  fetchLoanList: () => void;
  approveLoan: (loanId: string) => void;
  loan: any;
}

export interface userLoginType {
  user_email: string | undefined;
  user_password: string | undefined;
}

export interface adminLoginType {
  admin_email: string | undefined;
  admin_password: string | undefined;
}

export interface loansType {
  loanid: string;
  firstname: string;
  lastname: string;
  user_email: string;
  loan_amount: number;
  loan_status: string;
  term_duration: number;
}

export interface loanReqType {
  approved_date: string | null;
  customer_id: string;
  id: string;
  loan_amount: number;
  loan_paid: boolean;
  loan_status: string;
  paid_amount: number;
  term_duration: number;
  term_paid: number;
}

export interface userLoanDataType {
  id: string;
  approved_date: string | null;
  loan_amount: number;
  loan_paid: boolean;
  loan_status: string;
  paid_amount: number;
  term_duration: number;
  term_paid: number;
}

export interface loanApplicationType {
  loan_amount: number;
  term_duration: number;
}

export interface repayMentType {
  id: string;
  approved_date: string | null;
  loan_amount: number;
  loan_paid: boolean;
  term_paid: number;
  repayment_amount: number;
  repayment_dates: string[];
  term_duration: number;
}

export interface repayCardType {
  id: string;
  code: number;
  loan_paid: boolean;
  repayment_amount: number;
  repayment_date: string;
  paid: number;
}
