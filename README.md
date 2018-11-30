# Gery

[![npm](https://img.shields.io/npm/v/gery.svg)](https://www.npmjs.com/package/gery) [![Build Status](https://travis-ci.org/forsigner/gery.svg?branch=master)](https://travis-ci.org/forsigner/gery) [![Coverage Status](https://coveralls.io/repos/github/forsigner/gery/badge.svg?branch=master)](https://coveralls.io/github/forsigner/gery?branch=master)
[![npm](https://img.shields.io/badge/TypeScript-%E2%9C%93-007ACC.svg)](https://www.typescriptlang.org/) [![GitHub license](https://img.shields.io/github/license/forsigner/gery.svg)](https://github.com/forsigner/gery/blob/master/LICENSE)

> A Light weight Graphql client

## Installation

```sh
yarn add gery
```

## Usage

```js
import { Client, gql } from 'gery'

const query = gql`
  {
    posts(first: 2, where: { id: "cjkawhcz44a4c0a84un9a86wt" }) {
      id
      title
      text
      createdAt
    }
  }
`
const client = new Client(
  'https://eu1.prisma.sh/running-examples/hello-world/dev',
)

client
  .query(query)
  .then(data => console.log(data))
  .catch(error => {
    console.log(error)
  })
```

## License

[MIT License](https://github.com/forsigner/gery/blob/master/LICENSE)
