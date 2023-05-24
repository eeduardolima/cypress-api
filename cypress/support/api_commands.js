
const API_URL = Cypress.config('baseUrl')
const authorization = `Bearer ${Cypress.env('ACCESS_TOKEN')}`
const sampleFormBody = require('../fixtures/sampleForm.json')

Cypress.Commands.add('getUserInfo', () => {
    cy.request({
        method: 'GET',
        url: `${API_URL}/me`,
        headers: { authorization }
    })
})

Cypress.Commands.add('createNewForm', () => {
    cy.request({
        method: 'POST',
        url: `${API_URL}/forms`,
        headers: { authorization },
        body: sampleFormBody
    })
})

Cypress.Commands.add('deleteForm', (formId) => {
    cy.request({
        method: 'DELETE',
        url: `${API_URL}/forms/${formId}`,
        headers: { authorization }
    })
})

Cypress.Commands.add('formsCleanUp', () => {
    cy.request({
        method: 'GET',
        url: `${API_URL}/forms`,
        headers: { authorization }
    }).then(({ status, body }) => {
        expect(status).to.eq(200)

        body.items.forEach(item => {
            if (item.title === sampleFormBody.title) {
                cy.request({
                    method: 'DELETE',
                    url: `${API_URL}/forms/${item.id}`,
                    headers: { authorization }
                }).then(({ status }) => {
                    expect(status).to.eq(204)
                })
            }
        })
    })
})