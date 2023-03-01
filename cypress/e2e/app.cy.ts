// app.cy.js
import { aliasQuery, aliasMutation, hasOperationName } from '../../src/utils/graphql-test'

context('Tests', () => {
  beforeEach(() => {
    cy.intercept('POST', 'http://localhost:3000/graphql', (req) => {
      // Queries
      aliasQuery(req, 'getAllTodos')

      // Mutations
      aliasMutation(req, 'createUser')

      aliasMutation(req, 'createTodo')

      aliasMutation(req, 'deleteTodo')
    })
  })

  it('should load todos', () => {
    cy.intercept('POST', 'http://localhost:3000/graphql', (req) => {
      if (hasOperationName(req, 'getAllTodos')) {
        req.alias = 'getAllTodos'
      }
    })

    cy.visit('/')

    cy.wait('@getAllTodos')
      .its('response.body.data.getAllTodos')
      .should((todos) => {
        expect(todos.length).to.be.gte(1)
      })
  })

  it('should to create user', () => {
    cy.intercept('POST', 'http://localhost:3000/graphql', (req) => {
      if (hasOperationName(req, 'createUser')) {
        req.alias = 'createUser'
      }
    })

    cy.visit('/')

    cy.wait('@createUser')
  })
})
