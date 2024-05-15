
export const fillInLoginInput = (inputLabel: string, value: string) => cy.get(`[id="account_login_register_${inputLabel}"]`).type(value)

export const fillInRegisterInput = (inputLabel: string, value: string) => cy.get(`[id="account_address_${inputLabel}"]`).type(value)

export const fillInShippingInput = (inputLabel: string, value: string) => cy.get(`[id="shipping_${inputLabel}"]`).type(value)

export const createAccountCheckbox = () => cy.get('#account_login_register_which_register')

export const getButton = (buttonText: string) => cy.contains('.button', buttonText)

