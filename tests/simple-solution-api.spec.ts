import { expect, test } from '@playwright/test'

import { StatusCodes } from 'http-status-codes'

let baseUrl: string
let endpoint: string
let orderId: number
let key: string

test.beforeAll(async () => {
  baseUrl = "https://backend.tallinn-learning.ee"
});

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
  // prepare request body
  const requestBody = {
    status: 'OPEN',
    courierId: 0,
    customerName: 'string',
    customerPhone: 'string',
    comment: 'string',
    id: 0,
  }
  // Send a POST request to the server
  const response = await request.post('https://backend.tallinn-learning.ee/test-orders', {
    data: requestBody,
  })
  // Log the response status and body
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect(response.status()).toBe(StatusCodes.OK)
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
  // prepare request body
  const requestBody = {
    status: 'CLOSED',
    courierId: 0,
    customerName: 'string',
    customerPhone: 'string',
    comment: 'string',
    id: 0,
  }
  // Send a POST request to the server
  const response = await request.post('https://backend.tallinn-learning.ee/test-orders', {
    data: requestBody,
  })
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

// HW-9


// PUT

test('Request containing ID and valid key updates order and returns order object', async ({request: req}) => {

endpoint = 'test-orders'
  orderId = 10
  key = '1234567890123456'

  const header = {api_key: key }

  const body = {
    "status": "OPEN",
    "courierId": 12345,
    "customerName": "John Smith",
    "customerPhone": "67890",
    "comment": "Delivery after 5pm",
    "id": 54321
}

const res = await req.put(`${baseUrl}/${endpoint}/${orderId}`,
  {data: body, headers: header})

expect(res.status()).toBe(StatusCodes.OK)
})

// DELETE

// GET