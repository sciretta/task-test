import { request, GraphQLClient } from 'graphql-request'

const client = new GraphQLClient(process.env.ENDPOINT, {
  headers: {
    Authorization: `Bearer ${process.env.TOKEN}`
  }
})

export default client
