function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min
}

function assignMinIncomeAndMaxDebt(risk: string): number[] {
  if (risk === 'low') return [2_000, 0, 500, 1_000]
  if (risk === 'med') return [2_000, 0, 1_000, 2_000]
  return [0, 1_000, 5_000, 10_000]
}

export default class LoanCalcDto {
  income: number
  debt: number
  age: number
  employed: boolean
  loanAmount: number
  loanPeriod: number

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

  static createRandomData(risk: string = 'low'): LoanCalcDto {
    const maxIncome = 5_000
    const minAge = 16
    const maxAge = 100
    const minLoanAmount = 100

    const [minIncome, minDebt, maxDebt, maxLoanAmount] = assignMinIncomeAndMaxDebt(risk)
    return new LoanCalcDto(
      randomInt(minIncome, maxIncome),
      randomInt(minDebt, maxDebt),
      randomInt(minAge, maxAge),
      true,
      randomInt(minLoanAmount, maxLoanAmount),
      12,
    )
  }
}
