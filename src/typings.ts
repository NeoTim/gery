export interface Result<T> {
  data?: T
  extensions?: any
  headers: Headers
  status: number
  errors?: any
}

export interface Variables {
  [key: string]: any
}

export interface Headers {
  [key: string]: string
}

export interface Options {
  method?: RequestInit['method']
  headers?: Headers
  mode?: RequestInit['mode']
  credentials?: RequestInit['credentials']
  cache?: RequestInit['cache']
  redirect?: RequestInit['redirect']
  referrer?: RequestInit['referrer']
  referrerPolicy?: RequestInit['referrerPolicy']
  integrity?: RequestInit['integrity']
}
