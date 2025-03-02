export const AuthConstants = Object.freeze({
    AUTH: 'authenticated',
    UNAUTH: 'unauthenticated',
    LOADING: 'loading'
  })

export type AuthType =
  | 'authenticated'
  | 'unauthenticated'
  | 'loading'