import { expect, test } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'
import { LoginDto } from '../dto/login-dto'

let baseUrl: string
let endpoint: string

test.beforeAll(async () => {
  baseUrl = 'https://backend.tallinn-learning.ee'
  endpoint = 'login/student'
})

test('Incorrect login credentials returns 401', async ({ request }) => {
  const response = await request.post(`${baseUrl}/${endpoint}`, {
    data: LoginDto.createLoginWithIncorrectCredentials(),
  })

  expect.soft(response.status()).toBe(StatusCodes.UNAUTHORIZED)
})

test('Correct login credentials returns 200', async ({ request }) => {
  console.log(LoginDto.createLoginWithCorrectCredentials())

  const response = await request.post(`${baseUrl}/${endpoint}`, {
    data: LoginDto.createLoginWithCorrectCredentials(),
  })
  expect.soft(response.status()).toBe(StatusCodes.OK)
})
