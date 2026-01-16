export type ApiResponse<T = unknown> = ApiSuccess<T> | ApiError

export enum ApiCode {
  // Authentication
  USER_CREATED_SUCCESSFULLY = 'USER_CREATED_SUCCESSFULLY',
  USER_AUTHENTICATED_SUCCESSFULLY = 'USER_AUTHENTICATED_SUCCESSFULLY',
  USER_ALREADY_EXISTS = 'USER_ALREADY_EXISTS',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',

  // Generics
  INTERNAL_ERROR = 'INTERNAL_ERROR',
}

type ApiSuccess<T> = {
  success: true
  code: ApiCode
  data?: T
}

type ApiError = {
  success: false
  code: ApiCode
  details?: {
    [field: string]: string[]
  }
}
