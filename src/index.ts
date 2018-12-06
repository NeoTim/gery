import fetch from 'cross-fetch'
import { Options, Variables } from './typings'
import gql from './gql'

export { gql, GraphQLClient, query }

class GraphQLClient {
  private options: Options

  constructor(options: Options) {
    this.options = options
  }

  async query<T>(gqlStr: string, variables?: Variables): Promise<T> {
    const { headers, ...rest } = this.options

    const body = JSON.stringify({
      query: gqlStr,
      variables: variables ? variables : undefined,
    })

    const res = await fetch(this.options.endpoint, {
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
    throw result
  }
}

async function query<T extends any>(
  endpoint: string,
  gqlStr: string,
  variables?: Variables,
): Promise<T> {
  const client = new GraphQLClient({ endpoint })
  return client.query<T>(gqlStr, variables)
}

async function getResult(res: Response): Promise<any> {
  const contentType = res.headers.get('Content-Type')
  const isJSON = contentType && contentType.indexOf('application/json') > -1
  return isJSON ? res.json() : res.text()
}
