/* eslint-disable no-undef */
describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const firstUser = {
      username: 'john_doe',
      name: 'John Doe',
      password: 'myAwesomePassword',
    }
    const secondUser = {
      username: 'jane_doe',
      name: 'Jane Doe',
      password: 'myAwesomePassword',
    }
    cy.request('POST', 'http://localhost:3001/api/users', firstUser)
    cy.request('POST', 'http://localhost:3001/api/users', secondUser)
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function () {
    cy.contains('Login')
    cy.contains('Username')
    cy.contains('Password')
    cy.contains('Login')
  })

  describe('Login', function () {
    it('success with correct credentials', function () {
      cy.get('#username').type('john_doe')
      cy.get('#password').type('myAwesomePassword')
      cy.get('#login-button').click()

      cy.get('#menu-button').click()

      cy.get('#dropdown-menu')
        .should('contain', 'John Doe')
        .should('contain', 'Logout')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('john_doe')
      cy.get('#password').type('wrongPassword')
      cy.get('#login-button').click()

      cy.get('.notification-container')
        .should('contain', 'Error!')
        .should('contain', 'Invalid username or password')

      cy.get('.bg-red-950')
        .should('have.css', 'background-color')
        .and('eq', 'oklch(0.258 0.092 26.042)')

      cy.get('#menu-button').should('not.exist')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.get('#username').type('john_doe')
      cy.get('#password').type('myAwesomePassword')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function () {
      cy.get('#create-blog-button').click()

      cy.get('#title').type('An awesome blog')
      cy.get('#author').type('Johny Bravo')
      cy.get('#url').type('http://theurioftheblog.com/an-awesome-blog')

      cy.get('#save-blog-button').click()

      cy.get('.notification-container')
        .should('contain', 'Done!')
        .should('contain', 'Blog An awesome blog by Johny Bravo added')

      cy.get('.bg-emerald-950')
        .should('have.css', 'background-color')
        .and('eq', 'oklch(0.262 0.051 172.552)')

      cy.get('.blog-container').eq(0).should('contain', 'An awesome blog')
      cy.get('.blog-container a').should('have.attr', 'href')
    })

    it('user can like a blog', function () {
      cy.get('#create-blog-button').click()
      cy.get('#title').type('An awesome blog')
      cy.get('#author').type('Johny Bravo')
      cy.get('#url').type('http://theurioftheblog.com/an-awesome-blog')
      cy.get('#save-blog-button').click()

      cy.get('.blog-container a').eq(0).click()
      cy.get('.blog-like-button').click()

      cy.get('.notification-container')
        .should('contain', 'Done!')
        .should('contain', 'Blog An awesome blog by Johny Bravo liked!')

      cy.get('.bg-emerald-950')
        .should('have.css', 'background-color')
        .and('eq', 'oklch(0.262 0.051 172.552)')

      cy.get('.blog-info-container').contains('1 people like this blog.')
    })

    it('user who created a blog can delete it', function () {
      cy.get('#create-blog-button').click()
      cy.get('#title').type('An awesome blog')
      cy.get('#author').type('Johny Bravo')
      cy.get('#url').type('http://theurioftheblog.com/an-awesome-blog')
      cy.get('#save-blog-button').click()

      cy.get('.blog-container a').eq(0).click()
      cy.get('.blog-delete-button').click()

      cy.get('.notification-container')
        .should('contain', 'Done!')
        .should('contain', 'Blog An awesome blog by Johny Bravo deleted')

      cy.get('.bg-emerald-950')
        .should('have.css', 'background-color')
        .and('eq', 'oklch(0.262 0.051 172.552)')

      cy.get('.blogs-list').should('not.contain', 'An awesome blog')
    })

    it('only the creator can see the delete button of a blog', function () {
      cy.get('#create-blog-button').click()
      cy.get('#title').type('An awesome blog')
      cy.get('#author').type('Johny Bravo')
      cy.get('#url').type('http://theurioftheblog.com/an-awesome-blog')
      cy.get('#save-blog-button').click()

      cy.get('#menu-button').click()
      cy.get('.logout-button').click()

      cy.get('#username').type('jane_doe')
      cy.get('#password').type('myAwesomePassword')
      cy.get('#login-button').click()

      cy.get('.blog-container a').eq(0).click()

      cy.get('.blog-info-container')
        .should('not.contain', 'Delete')
        .should('not.have.class', 'blog-delete-button')
    })

    it('blogs are ordered by likes', function () {
      cy.get('#create-blog-button').click()

      cy.get('#title').type('An awesome blog')
      cy.get('#author').type('Johny Bravo')
      cy.get('#url').type('http://theurioftheblog.com/an-awesome-blog')
      cy.get('#save-blog-button').click()

      cy.get('#create-blog-button').click()
      cy.get('#title').type('Just another wonderful blog')
      cy.get('#author').type('Elvis Presley')
      cy.get('#url').type(
        'http://theurioftheblog.com/just-anoter-wonderful-blog'
      )
      cy.get('#save-blog-button').click()

      cy.get('.blog-container a').eq(1).wait(2000).click()

      cy.get('.blog-like-button').click()
      cy.get('.blog-like-button').wait(2000).click()

      cy.get('#site-title').click()

      cy.get('.blog-container')
        .eq(0)
        .should('contain', 'Just another wonderful blog')
      cy.get('.blog-container').eq(1).should('contain', 'An awesome blog')
    })
  })
})
