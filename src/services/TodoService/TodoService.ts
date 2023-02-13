import gql from 'graphql-tag'

export const CREATE = gql`
  mutation createTodo($todo: CreateTodoDto!) {
    createTodo(createTodo: $todo) {
      userId
      text
    }
  }
`

export const GET_ALL = gql`
  query {
    getAllTodos {
      id
      userId
      updatedAt
      text
      createdAt
      status
    }
  }
`

export const DELETE = gql`
  mutation deleteTodo($id: Float!) {
    deleteTodo(id: $id)
  }
`
