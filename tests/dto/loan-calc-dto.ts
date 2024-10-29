function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min
}

function assignMaxAndMinByRiskLevel(risk: string): number[] {
  // minIncome, minDebt, maxDebt, maxLoanAmount, minAge, maxAge
  if (risk === 'low') return [2_000, 0, 500, 1_000, 30, 50]
  if (risk === 'medium') return [1_500, 0, 2_200, 2_200, 16, 29]
  return [0, 2_000, 10_000, 10_000, 31, 100]
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

  static createLoanApplicationDtoWithRandomisedData(risk: string = 'low'): LoanCalcDto {
    const maxIncome = 5_000
    const minLoanAmount = 100

    const [minIncome, minDebt, maxDebt, maxLoanAmount, minAge, maxAge] =
      assignMaxAndMinByRiskLevel(risk)
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
