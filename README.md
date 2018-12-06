# Gery

[![npm](https://img.shields.io/npm/v/gery.svg)](https://www.npmjs.com/package/gery) [![Build Status](https://travis-ci.org/forsigner/gery.svg?branch=master)](https://travis-ci.org/forsigner/gery) [![Coverage Status](https://coveralls.io/repos/github/forsigner/gery/badge.svg?branch=master)](https://coveralls.io/github/forsigner/gery?branch=master)
[![npm](https://img.shields.io/badge/TypeScript-%E2%9C%93-007ACC.svg)](https://www.typescriptlang.org/) [![GitHub license](https://img.shields.io/github/license/forsigner/gery.svg)](https://github.com/forsigner/gery/blob/master/LICENSE)

> A light weight GraphQL GraphQLClient

## Installation

```sh
yarn add gery
```

## Quick start

```js
import { query, gql } from 'graphql-request'

const GET_PERSONS = gql`
  {
    allPersons {
      id
      name
    }
  }
`

const endpoint = 'https://api.graph.cool/simple/v1/swapi'
```

## Use Client

```js
import { GraphQLClient, gql } from 'gery'

const GET_PERSONS = gql`
  {
    allPersons {
      id
      name
    }
  }
`
const GraphQLClient = new GraphQLClient({
  endpoint: 'https://api.graph.cool/simple/v1/swapi',
})

GraphQLClient.query(GET_PERSONS).then(data => console.log(data))
```

## Variables

```js
const GET_PERSON = gql`
  query getPerson($id: ID) {
    Person(id: $id) {
      id
      name
    }
  }
`

const data = await query(endpoint, GET_PERSON, {
  id: 'cj0nv9peiewhf013011i9a4h2',
})
```

## Typescript

```js
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

const data = await query<Person>(endpoint, GET_PERSON, {
  id: 'cj0nv9peiewhf013011i9a4h2',
})
```

## License

[MIT License](https://github.com/forsigner/gery/blob/master/LICENSE)
