export type ApiResponse<T = unknown> = ApiSuccess<T> | ApiError

export enum ApiCode {
  // Authentication
  USER_CREATED = 'USER_CREATED',
  USER_AUTHENTICATED = 'USER_AUTHENTICATED',
  USER_ALREADY_EXISTS = 'USER_ALREADY_EXISTS',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',

  // Tasks
  TASK_CREATED = 'TASK_CREATED',
  TASK_UPDATED = 'TASK_UPDATED',
  TASK_DELETED = 'TASK_DELETED',
  TASK_NOT_FOUND = 'TASK_NOT_FOUND',

  // Generics
  SUCCESS = 'SUCCESS',
  BAD_REQUEST = 'BAD_REQUEST',
  UNAUTHORIZED = 'UNAUTHORIZED',
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
