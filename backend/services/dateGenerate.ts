export const repaymentDates = (approvedDate: string, term_duration: number) => {
  const repaymentDates = [];
  for (let i = 1; i <= term_duration; i++) {
    const repayDate = new Date(
      new Date().setDate(new Date().getDate() + 7 * i)
    ).toDateString();
    repaymentDates.push(repayDate);
  }
  return repaymentDates;
};
