import { expect, test } from '@playwright/test'
import { ApiClient } from '../../api/api-client'
import { LoginDto } from '../dto/login-dto'
import { StatusCodes } from 'http-status-codes'
import { OrderDto } from '../dto/order-dto'

test('Successful authorization and order creation', async ({ request }) => {
  const apiClient = await ApiClient.getInstance(request)
  const orderId = await apiClient.createOrderAndReturnOrderId()
  expect.soft(orderId).toBeDefined()
})

// HW 12

// TASK 2.1 – Without Client

type Headers = {
  Authorization: string
}
let token: string
let orderId: number | null
const baseUrl = 'https://backend.tallinn-learning.ee'
const loginEndpoint = 'login/student'
const orderEndpoint = 'orders'
let headers: Headers

test.describe('TASK 2.1 – Without Client', () => {
  test.beforeAll(async ({ request }) => {
    const response = await request.post(`${baseUrl}/${loginEndpoint}`, {
      data: LoginDto.createLoginWithCorrectCredentials(),
    })
    expect.soft(response.status()).toBe(StatusCodes.OK)
    token = await response.text()
    headers = { Authorization: `Bearer ${token}` }
  })

  test.beforeEach(async ({ request }) => {
    const orderResponse = await request.post(`${baseUrl}/${orderEndpoint}`, {
      data: OrderDto.createOrderWithUndefinedOrderId(),
      headers: headers,
    })
    const orderResponseBody = await orderResponse.json()
    orderId = orderResponseBody.id
    expect.soft(orderId).toBeDefined()
  })

  test.afterEach(() => {
    orderId = null
  })

  // SUB-PART 1) AUTHORISE AND GET ORDER BY ID

  test('Successfully get an order by its ID', async ({ request }) => {
    console.log(headers)
    const orderResponse = await request.get(`${baseUrl}/${orderEndpoint}/${orderId}`, {
      headers: headers,
    })
    expect(orderResponse.status()).toBe(StatusCodes.OK)
    const order = await orderResponse.json()
    const { id: retrievedOrderId } = order
    expect.soft(retrievedOrderId).toBeDefined()
    expect.soft(retrievedOrderId).toBe(orderId)
  })

  // SUB-PART 2) DELETE ORDER BY ID

  test('Successfully delete an order by its ID', async ({ request }) => {
    console.log(headers)

    const deleteResponse = await request.delete(`${baseUrl}/${orderEndpoint}/${orderId}`, {
      headers: headers,
    })
    console.log(deleteResponse)
    expect.soft(deleteResponse.status()).toBe(StatusCodes.OK)

    const deleteResponseBody = await deleteResponse.json()
    expect.soft(deleteResponseBody).toBe(true)
  })
})
// TASK 2.2 – Using Client

let apiClient: ApiClient
let id: number

test.describe('TASK 2.2 – Using Client', () => {
  test.beforeEach(async ({ request }) => {
    apiClient = await ApiClient.getInstance(request)
    id = await apiClient.createOrderAndReturnOrderId()
  })

  // SUB-PART 1) AUTHORISE AND GET ORDER BY ID
  test('Successfully get an order by its ID', async () => {
    await apiClient.getOrder(id)
  })

  // SUB-PART 2) DELETE ORDER BY ID
  test('Successfully delete an order by its ID', async () => {
    await apiClient.deleteOrder(id)
  })
})
