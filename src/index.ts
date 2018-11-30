import 'cross-fetch/polyfill'
import { Options, Variables } from './typings'
import gql from './gql'

export { gql, Client, Variables }

class Client {
  private enpoint: string
  private options: Options

  constructor(endpoint: string, options?: Options) {
    this.enpoint = endpoint
    this.options = options || {}
  }

  async query<T>(gqlStr: string, variables?: Variables): Promise<T> {
    const { headers, ...rest } = this.options

    const body = JSON.stringify({
      query: gqlStr,
      variables: variables ? variables : undefined,
    })

    const res = await fetch(this.enpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body,
      ...rest,
    })

    const result = await getResult(res)

    const isOK = res.ok && !result.errors && result.data
    if (isOK) return result.data

    // TODO: handle error
    throw new Error(JSON.stringify(res))
  }
}

async function getResult(res: Response): Promise<any> {
  const contentType = res.headers.get('Content-Type')
  const isJSON = contentType && contentType.indexOf('application/json') > -1
  return isJSON ? res.json() : res.text()
}
