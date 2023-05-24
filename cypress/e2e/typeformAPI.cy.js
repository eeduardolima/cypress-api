
const sampleFormBody = require('../fixtures/sampleForm.json')
describe('Typeform API Tests', () => {

  it('return my user information', () => {
    cy.getUserInfo().then(({ status, body }) => {
      const { alias, language } = body

      expect(status).to.eq(200)
      expect(alias).to.eq('Eduardo Lima')
      expect(language).to.eq('en')
    })
  })

  it('create form', () => {
    cy.formsCleanUp()
    cy.createNewForm().then(({ status, body }) => {
      const { fields, title, type } = body
      expect(status).to.eq(201)
      expect(fields.length).to.eq(sampleFormBody.fields.length)
      expect(title).to.eq(sampleFormBody.title)
      expect(type).to.eq(sampleFormBody.type)
    })
  })

  it('delete form', () => {
    cy.formsCleanUp()
    cy.createNewForm().then(({ body }) => {
      const id = body.id
      cy.deleteForm(id).then(({ status }) => {
        expect(status).to.eq(204)
      })
    })
  })
})