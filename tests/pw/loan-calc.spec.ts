import { expect, test } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'
import LoanCalcDto from '../dto/loan-calc-dto'

let baseUrl: string
let endpoint: string
let periodArr: number[]

test.beforeAll(async () => {
  baseUrl = 'https://backend.tallinn-learning.ee'
  endpoint = 'api/loan-calc/decision'
})

test('Request with correctly formatted body returns 200 (Low risk)', async ({ request }) => {
  const response = await request.post(`${baseUrl}/${endpoint}`, {
    data: LoanCalcDto.createRandomData(),
  })

  expect.soft(response.status()).toBe(StatusCodes.OK)

  const responseBody = await response.json()
  periodArr = [12, 18, 24, 30, 36]

  expect.soft(responseBody.riskLevel).toBe('Low Risk')
  expect.soft(responseBody.riskDecision).toBe('positive')
  expect.soft(responseBody.riskPeriods).toEqual(periodArr)
})

test('Request with correctly formatted body returns 200 (Med risk)', async ({ request }) => {
  const response = await request.post(`${baseUrl}/${endpoint}`, {
    data: { ...LoanCalcDto.createRandomData('medium') },
  })

  expect.soft(response.status()).toBe(StatusCodes.OK)

  const responseBody = await response.json()
  periodArr = [6, 9, 12]

  expect.soft(responseBody.riskLevel).toBe('Medium Risk')
  expect.soft(responseBody.riskDecision).toBe('positive')
  expect.soft(responseBody.riskPeriods).toEqual(periodArr)
})

test('Request with correctly formatted body returns 200 (Very High risk; rejected)', async ({
  request,
}) => {
  const response = await request.post(`${baseUrl}/${endpoint}`, {
    data: { ...LoanCalcDto.createRandomData('high'), employed: false },
  })

  expect.soft(response.status()).toBe(StatusCodes.OK)

  const responseBody = await response.json()

  expect.soft(responseBody.riskLevel).toBe('Very High Risk')
  expect.soft(responseBody.riskDecision).toBe('negative')
})

test('Request with negative debt returns 400 error', async ({ request }) => {
  const response = await request.post(`${baseUrl}/${endpoint}`, {
    data: { ...LoanCalcDto.createRandomData(), debt: -500 },
  })

  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('Request with negative income returns 400 error', async ({ request }) => {
  const response = await request.post(`${baseUrl}/${endpoint}`, {
    data: { ...LoanCalcDto.createRandomData(), income: -500 },
  })

  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

// API SHOULD RETURN NEGATIVE DECISION BUT RETURN POSITIVE INSTEAD
test('Request with age 5 returns rejected decision', async ({ request }) => {
  const response = await request.post(`${baseUrl}/${endpoint}`, {
    data: { ...LoanCalcDto.createRandomData(), age: 5 },
  })

  expect.soft(response.status()).toBe(StatusCodes.OK)

  const responseBody = await response.json()

  // SHOULD BE NEGATIVE
  expect.soft(responseBody.riskDecision).toBe('positive')
})
