import { createNewAccountByApi } from "../support/commands";
import { newCustomer } from "../fixtures/newCustomerData";
import {
  fillInLoginInput,
  fillInRegisterInput,
  fillInShippingInput,
  createAccountCheckbox,
  getButton,
} from "../support/loginHelper";
import {
  searchForProduct,
  selectStoreCategory,
  selectProductByItsTitle,
  addToCartButton,
  productAddedToCartModal,
  proceedToCheckout,
  itemInBasket,
  singleItemSelector,
} from "../support/productsHelper";
import * as verify from "../support/validationFunctions";

const welcomeMessage =
  "Welcome to your account. Use the menu below to navigate around your account, view your orders, update your address or send us a message.";
const productTitle = "Laptop 14";


describe("E-commerce website", () => {
  context("when creating a new account", () => {
    beforeEach(() => {
      cy.visit("");
      cy.contains("span", "Sign In").click();
    });

    it("user input validation should be returned", () => {
      cy.intercept("GET", "**/CartService.svc/**").as("login");

      createAccountCheckbox().click();

      cy.log("Veryfing that invalid email address validation appears");
      fillInLoginInput("email", newCustomer.invalidEmail);
      getButton("Continue").click();
      verify.invalidInputValidation("Invalid Email Address");

      cy.log("Veryfing that invalid password validation appears");
      fillInLoginInput("email", newCustomer.email);
      getButton("Continue").click();
      verify.invalidInputValidation("Password too short - min 5 characters");

      fillInLoginInput("register_password", newCustomer.password);
      getButton("Continue").click();
      cy.wait("@login").its("response.statusCode").should("eq", 200);

      cy.log("Veryfing that invalid inputs validations appear");
      getButton("Register").click();
      verify.invalidInputValidation("First name required");
      verify.invalidInputValidation("Last name required");
      verify.invalidInputValidation("Address Required");
      verify.invalidInputValidation("City/Town required");
      verify.invalidInputValidation("County Required");
      verify.invalidInputValidation("Postcode/Zip required");
    });

    it("a new account should be created", () => {
      cy.intercept("GET", "**/CartService.svc/**").as("login");
      cy.intercept("POST", "**/RegisterAccount").as("registerAccount");

      createAccountCheckbox().click();
      fillInLoginInput("email", newCustomer.email);
      fillInLoginInput("register_password", newCustomer.password);
      getButton("Continue").click();
      cy.wait("@login").its("response.statusCode").should("eq", 200);

      fillInRegisterInput("fname", newCustomer.firstName);
      fillInRegisterInput("lname", newCustomer.lastName);
      fillInRegisterInput("address1", newCustomer.address);
      fillInRegisterInput("city", newCustomer.city);
      fillInShippingInput("county", newCustomer.country);
      fillInShippingInput("postcode", newCustomer.postcode);
      getButton("Register").click();
      cy.wait("@registerAccount").its("response.statusCode").should("eq", 200);

      verify.accountWasCreatedSuccesfully(`${newCustomer.firstName} ${newCustomer.lastName}`);
    });
  });

  context("when logging into existing account", () => {
    beforeEach(() => {
      cy.intercept("GET", "**/CartService.svc/**").as("login");
      cy.intercept("GET", "**/releases/**").as("loadButtons");
      createNewAccountByApi(
        newCustomer.address,
        newCustomer.city,
        newCustomer.country,
        newCustomer.firstName,
        newCustomer.lastName,
        newCustomer.postcode,
        newCustomer.email,
        newCustomer.password
      );
      cy.visit("");
      cy.contains("span", "Sign In").click();
      fillInLoginInput("email", newCustomer.email);
      fillInLoginInput("login_password", newCustomer.password);
      getButton("Login").click();
      cy.wait(["@login", "@loadButtons", "@loadButtons"]);
      cy.contains(welcomeMessage).should("be.visible");
    });

    it("user should be logged into the newly created account and can get back to the homepage", () => {
      cy.url().should("contain", "account");
      cy.contains("a", "Back to Store").click();
      cy.url().should("eq", Cypress.config("baseUrl"));
    });

    it("user should get correct results while filtering products", () => {
      cy.contains("a", "Back to Store").click();
      selectStoreCategory("Electronics");
      cy.get(singleItemSelector).then((initialResults) => {
        const initialResultsCount = initialResults.length;
        verify.eachProducttHasImageAndPrice();
        searchForProduct("Laptop");
        verify.eachResultContainsSearchedPhrase("Laptop");

        cy.get(singleItemSelector).then((filteredResults) => {
          const filteredResultsCount = filteredResults.length;
          const resultsChanged = verify.resultsChanged(initialResultsCount, filteredResultsCount);
          expect(resultsChanged).to.be.true;
        });
      });
    });

    it("user should be able to add products to the cart", () => {
      cy.intercept("GET", "**/CartService.svc/**").as("productDetails");

      cy.contains("a", "Back to Store").click();
      searchForProduct("Laptop");
      selectProductByItsTitle(productTitle);
      cy.wait("@productDetails").its("response.statusCode").should("eq", 200);

      addToCartButton().click();
      productAddedToCartModal().should("be.visible");
      proceedToCheckout().click();
      itemInBasket().should("contain", productTitle);
    });
  });
});
