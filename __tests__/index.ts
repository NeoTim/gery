import fetchMock from 'fetch-mock'

import { Client, gql } from '../src'

test('can query', async () => {
  const endpoint = 'http://example.com/graphql'

  const response = {
    data: {
      foo: 'bar',
    },
  }
  const gqlStr = gql`
    {
      foo
    }
  `

  fetchMock.mock(endpoint, response)

  const data1: typeof response = await fetch(endpoint).then(r => r.json())

  const client = new Client(endpoint)
  const data2 = await client.query<{ foo: string }>(gqlStr)

  expect(data1.data.foo).toBe(data2.foo)

  fetchMock.restore()
})
