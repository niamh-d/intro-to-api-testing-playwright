import { APIRequestContext } from 'playwright'
import { LoginDto } from '../tests/dto/login-dto'
import { StatusCodes } from 'http-status-codes'
import { expect } from '@playwright/test'
import { OrderDto } from '../tests/dto/order-dto'

const serviceURL = 'https://backend.tallinn-learning.ee/'
const loginPath = 'login/student'
const orderPath = 'orders'

type Headers = {
  Authorization: string
}

export class ApiClient {
  static instance: ApiClient
  private request: APIRequestContext
  private jwt: string = ''
  private headers: Headers | undefined

  private constructor(request: APIRequestContext) {
    this.request = request
  }

  public static async getInstance(request: APIRequestContext): Promise<ApiClient> {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient(request)
      await this.instance.requestJwt()
    }
    return ApiClient.instance
  }

  private async requestJwt(): Promise<void> {
    console.log('Requesting JWT...')
    const authResponse = await this.request.post(`${serviceURL}${loginPath}`, {
      data: LoginDto.createLoginWithCorrectCredentials(),
    })
    // Check response status for negative cases
    if (authResponse.status() !== StatusCodes.OK) {
      console.log('Authorization failed')
      throw new Error(`Request failed with status ${authResponse.status()}`)
    }

    // Save the JWT token as a client property
    this.jwt = await authResponse.text()
    console.log('jwt received:')
    console.log(this.jwt)
    this.headers = { Authorization: `Bearer ${this.jwt}` }
  }

  async deleteOrder(orderId: number): Promise<void> {
    console.log('Delete order...')
    const response = await this.request.delete(`${serviceURL}${orderPath}/${orderId}`, {
      headers: this.headers,
    })
    console.log('Delete response: ', response)

    expect(response.status()).toBe(StatusCodes.OK)
    const body = await response.json()
    console.log('Order deleted: ')
    console.log(body)
    expect.soft(body).toBe(true)
  }

  async getOrder(orderId: number): Promise<void> {
    console.log(`Fetching order with ID ${orderId}`)
    const response = await this.request.get(`${serviceURL}${orderPath}/${orderId}`, {
      headers: this.headers,
    })
    console.log('Order response: ', response)

    expect(response .status()).toBe(StatusCodes.OK)
    const order = await response.json()
    const {id} = order
    expect.soft(id).toBeDefined()
    expect.soft(id).toBe(orderId)
  }

  async createOrderAndReturnOrderId(): Promise<number> {
    console.log('Creating order...')
    const response = await this.request.post(`${serviceURL}${orderPath}`, {
      data: OrderDto.createOrderWithUndefinedOrderId(),
      headers: this.headers,
    })
    console.log('Order response: ', response)

    expect(response.status()).toBe(StatusCodes.OK)
    const responseBody = await response.json()
    console.log('Order created: ')
    console.log(responseBody)

    return responseBody.id
  }
}