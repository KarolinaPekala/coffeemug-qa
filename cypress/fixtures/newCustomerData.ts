const randomNumber = Cypress._.random(0, 999)

export const newCustomer = {
  firstName: 'Firstname' + randomNumber,
  lastName: 'Lastname' + randomNumber,
  invalidEmail: 't',
  email: 'testuser' + randomNumber + '@karotest.com',
  password: 'testPassword123',
  address: 'Lesna 23',
  city: 'Lodz',
  country: 'Poland',
  postcode: '12-345'
}




