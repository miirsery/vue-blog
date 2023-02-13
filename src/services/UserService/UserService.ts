import gql from 'graphql-tag'

export const CREATE = gql`
  mutation createUser($user: CreateUserDto!) {
    createUser(createUser: $user) {
      name
      email
    }
  }
`
