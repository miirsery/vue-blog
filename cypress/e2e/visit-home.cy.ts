describe('send to backend', () => {
  it('visit home', () => {
    cy.visit('http://localhost:3000/')
  })

  it('get users', () => {
    cy.request('http://localhost:3000/users').as('getUsers')

    cy.get('@getUsers').should((response: any) => {
      response.body.forEach((user: any) => {
        expect(user).to.have.property('name')
      })

      expect(response.status).to.eq(200)
    })
  })

  it('create user', () => {
    cy.request('post', 'http://localhost:3000/users', {
      id: 3,
      name: 'John',
    }).as('createUser')

    cy.get('@createUser').should((response: any) => {
      expect(response.body).to.have.property('message')

      expect(response.status).to.eq(201)
    })
  })
})
