/// <reference types="cypress" />

export const createNewAccountByApi = (
  address1: string,
  city: string,
  county: string,
  fname: string,
  lname: string,
  zip: string,
  email: string,
  pwd: string
) => {
  return cy.request({
    method: "POST",
    url: "/CartService.svc/RegisterAccount",
    failOnStatusCode: true,
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      address: {
        address1,
        city,
        country: '127',
        county,
        fname,
        lname,
        zip,
      },
      shopkeeper: "946869",
      email,
      pwd
    },
  });
};
