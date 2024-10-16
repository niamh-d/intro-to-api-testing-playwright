import axios from 'axios'
import { AxiosResponse, AxiosError } from 'axios'

describe('testing API with Jest and Axios', () => {

  let endpoint: string
  let baseUrl: string

  beforeEach(() => {
    baseUrl = 'https://backend.tallinn-learning.ee'
  })


  test('GET Request with username and password returns API key ', async () => {
    endpoint = 'test-orders'
    const username = 'averycreativeusername'
    const password = 'averystrongpassword'

    const response: AxiosResponse = await axios.get(`${baseUrl}/${endpoint}?username=${username}&password=${password}`)

    expect(response.status).toBe(200)
  })

test('GET Request without username fails as server error', async () => {
  endpoint = 'test-orders'
  const username = ''
  const password = 'averystrongpassword'

  try {
    await axios.get(`${baseUrl}/${endpoint}?username=${username}&password=${password}`)
  }
  catch(err) {
    expect((err as AxiosError).message).toBe('Request failed with status code 500')
  }
})
})