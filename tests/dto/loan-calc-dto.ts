export default class LoanCalcDto {
  'income': number
  'debt': number
  'age': number
  'employed': boolean
  'loanAmount': number
  'loanPeriod': number

  private constructor(
    income: number,
    debt: number,
    age: number,
    employed: boolean,
    loanAmount: number,
    loanPeriod: number,
  ) {
    this.income = income
    this.debt = debt
    this.age = age
    this.employed = employed
    this.loanAmount = loanAmount
    this.loanPeriod = loanPeriod
  }

  static createRandomData(): LoanCalcDto {
    return new LoanCalcDto(2000, 0, 30, true, 1000, 12)
  }
}
