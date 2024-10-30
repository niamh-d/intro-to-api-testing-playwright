import { expect, test } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'
import { LoginDto } from '../dto/login-dto'

let baseUrl: string
let endpoint: string

function validateToken(token: string): boolean {
  return /^eyJhb[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/.test(token)
}

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

test('Incorrect HTTP method (get) returns 405', async ({ request }) => {
  const response = await request.get(`${baseUrl}/${endpoint}`, {
    data: LoginDto.createLoginWithCorrectCredentials(),
  })

  expect.soft(response.status()).toBe(StatusCodes.METHOD_NOT_ALLOWED)
})

test('Correct login credentials returns 200', async ({ request }) => {
  const response = await request.post(`${baseUrl}/${endpoint}`, {
    data: LoginDto.createLoginWithCorrectCredentials(),
  })

  expect.soft(response.status()).toBe(StatusCodes.OK)
  const responseText = await response.text()
  expect.soft(validateToken(responseText)).toBe(true)
})
