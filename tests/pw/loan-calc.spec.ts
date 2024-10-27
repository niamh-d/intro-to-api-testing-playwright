import { expect, test } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'
import LoanCalcDto from '../dto/loan-calc-dto'

let baseUrl: string
let endpoint: string

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

  expect.soft(responseBody.riskLevel).toBe('Low Risk')
})

test('Request with correctly formatted body returns 200 (Med risk)', async ({ request }) => {
  const response = await request.post(`${baseUrl}/${endpoint}`, {
    data: { ...LoanCalcDto.createRandomData(), debt: 500 },
  })

  expect.soft(response.status()).toBe(StatusCodes.OK)

  const responseBody = await response.json()

  expect.soft(responseBody.riskLevel).toBe('Medium Risk')
})

test('Request with correctly formatted body returns 200 (High risk)', async ({ request }) => {
  const response = await request.post(`${baseUrl}/${endpoint}`, {
    data: { ...LoanCalcDto.createRandomData(), debt: 3000, age: 25, employed: false },
  })

  expect.soft(response.status()).toBe(StatusCodes.OK)

  const responseBody = await response.json()

  expect.soft(responseBody.riskLevel).toBe('Very High Risk')
})
