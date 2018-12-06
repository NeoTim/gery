import { GraphQLClient, query, gql } from '../src'

interface Person {
  Person: {
    id: string
    name: string
  }
}

interface AllPersons {
  allPersons: Array<Person['Person']>
}

const endpoint = 'https://api.graph.cool/simple/v1/swapi'

const QUERY_PERSON = gql`
  {
    allPersons {
      id
      name
    }
  }
`

interface Person {
  Person: {
    id: string
    name: string
  }
}
const GET_PERSON = gql`
  query getPerson($id: ID) {
    Person(id: $id) {
      id
      name
    }
  }
`

test('can query by client', async () => {
  const client = new GraphQLClient({ endpoint })
  const data = await client.query<AllPersons>(QUERY_PERSON)
  expect(typeof data.allPersons.length).toBe('number')
})

test('can query', async () => {
  const data = await query<AllPersons>(endpoint, QUERY_PERSON)
  expect(typeof data.allPersons.length).toBe('number')
})

test('use varialbles', async () => {
  const data = await query<Person>(endpoint, GET_PERSON, {
    id: 'cj0nv9peiewhf013011i9a4h2',
  })
  expect(data.Person.id).toBe('cj0nv9peiewhf013011i9a4h2')
})

test('error', async () => {
  try {
    await query<Person>(endpoint, 'ERROR')
  } catch (error) {
    expect(!!error).toBe(true)
  }
})
