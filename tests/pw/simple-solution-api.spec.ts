import { expect, test } from '@playwright/test'

import { StatusCodes } from 'http-status-codes'
import { OrderDto } from '../dto/order-dto'

let baseUrl: string
let endpoint: string
let orderId: number
let key: string

test.beforeAll(async () => {
  baseUrl = 'https://backend.tallinn-learning.ee'
})

test('get order with correct id should receive code 200', async ({ request }) => {
  // Build and send a GET request to the server
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders/1')
  // Log the response status, body and headers
  console.log('response body:', await response.json())
  console.log('response headers:', response.headers())
  // Check if the response status is 200
  expect(response.status()).toBe(StatusCodes.OK)
})

test('post order with correct data should receive code 200', async ({ request }) => {
  const body = OrderDto.createOrderWithCorrectRandomData()

  // Send a POST request to the server
  const response = await request.post('https://backend.tallinn-learning.ee/test-orders', {
    data: body,
  })
  // Log the response status and body
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect.soft(response.status()).toBe(StatusCodes.OK)

  const responseBody = await response.json()
  expect.soft(responseBody.status).toBe('OPEN')
  expect.soft(responseBody.customerName).toBe('John Doe')
})

test('get order with id outside range should receive code 400', async ({ request }) => {
  // Build and send a GET request to the server
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders/11')
  // Log the response status, body and headers
  console.log('response body:', await response.json())
  console.log('response headers:', response.headers())
  // Check if the response status is 200
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('if status is set to CLOSED it returns 400', async ({ request }) => {
  const body = OrderDto.createOrderWithCorrectRandomData()
  // Send a POST request to the server
  const response = await request.post('https://backend.tallinn-learning.ee/test-orders', {
    data: {
      ...body,
      status: 'CLOSED',
    },
  })
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

// HW-9

// PUT

test('PUT Request containing ID and valid key updates order and returns order object', async ({
  request: req,
}) => {
  endpoint = 'test-orders'
  orderId = 10
  key = '1234567890123456'

  const header = { api_key: key }

  const body = OrderDto.createOrderWithCorrectRandomData()

  const res = await req.put(`${baseUrl}/${endpoint}/${orderId}`, { data: body, headers: header })

  expect(res.status()).toBe(StatusCodes.OK)
})

test('PUT Request without valid key is rejected as unauthorised', async ({ request: req }) => {
  endpoint = 'test-orders'
  orderId = 10
  key = ''

  const header = { api_key: key }

  const body = OrderDto.createOrderWithCorrectRandomData()

  const res = await req.put(`${baseUrl}/${endpoint}/${orderId}`, { data: body, headers: header })

  expect(res.status()).toBe(StatusCodes.UNAUTHORIZED)
})

test('PUT Request with ID out of range fails as bad request', async ({ request: req }) => {
  endpoint = 'test-orders'
  orderId = 11
  key = '1234567890123456'

  const header = { api_key: key }

  const body = OrderDto.createOrderWithCorrectRandomData()

  const res = await req.put(`${baseUrl}/${endpoint}/${orderId}`, { data: body, headers: header })

  expect(res.status()).toBe(StatusCodes.BAD_REQUEST)
})

// DELETE

test('DELETE Request containing ID and valid key deletes order and returns success message', async ({
  request: req,
}) => {
  endpoint = 'test-orders'
  orderId = 10
  key = '1234567890123456'

  const header = { api_key: key }

  const res = await req.delete(`${baseUrl}/${endpoint}/${orderId}`, { headers: header })

  expect(res.status()).toBe(StatusCodes.NO_CONTENT)
})

test('DELETE Request without valid key is rejected as unauthorised', async ({ request: req }) => {
  endpoint = 'test-orders'
  orderId = 10
  key = ''

  const header = { api_key: key }

  const res = await req.delete(`${baseUrl}/${endpoint}/${orderId}`, { headers: header })

  expect(res.status()).toBe(StatusCodes.UNAUTHORIZED)
})

test('DELETE Request with invalid order ID fails as bad request', async ({ request: req }) => {
  endpoint = 'test-orders'
  orderId = 11
  key = '1234567890123456'

  const header = { api_key: key }

  const res = await req.delete(`${baseUrl}/${endpoint}/${orderId}`, { headers: header })

  expect(res.status()).toBe(StatusCodes.BAD_REQUEST)
})

// GET

test('GET Request with username and password returns API key ', async ({ request: req }) => {
  endpoint = 'test-orders'
  const username = 'averycreativeusername'
  const password = 'averystrongpassword'

  const res = await req.get(`${baseUrl}/${endpoint}?username=${username}&password=${password}`)

  expect(res.status()).toBe(StatusCodes.OK)
})

test('GET Request without username fails as server error', async ({ request: req }) => {
  endpoint = 'test-orders'
  const username = ''
  const password = 'averystrongpassword'

  const res = await req.get(`${baseUrl}/${endpoint}?username=${username}&password=${password}`)

  expect(res.status()).toBe(StatusCodes.INTERNAL_SERVER_ERROR)
})
