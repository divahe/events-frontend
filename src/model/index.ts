export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

export interface User {
  id: number
  email: string
  firstName: string
  lastName: string
  username: string
  role: keyof typeof Role
  idCode: string
}

export interface Event {
  id: number
  name: string
  participants: number
  time: string
  appUsers: User[]
}

export interface LoginData {
  username: string
  password: string
}

export interface AuthResponse {
  accessToken: string
  refreshToken: string
  userId: number
}

export interface RegistrationData {
  eventId: number
  appUser: Partial<User>
}
