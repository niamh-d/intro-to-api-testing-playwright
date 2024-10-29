import dotenv from 'dotenv'
import path from 'path'

// Read from ".env" file.
dotenv.config({ path: path.resolve('.env') })

export class LoginDto {
  username: string
  password: string

  private constructor(username: string, password: string) {
    this.username = username
    this.password = password
  }

  static createLoginWithCorrectCredentials(): LoginDto {
    // eslint-disable-next-line no-undef
    return new LoginDto(process.env.USERNAME || '', process.env.PASSWORD || '')
  }

  static createLoginWithIncorrectCredentials(): LoginDto {
    return new LoginDto('incorrect-username', 'incorrect-password')
  }
}
