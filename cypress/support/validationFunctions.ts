import { singleItemSelector } from "./productsHelper";

export const invalidInputValidation = (validationMessage: string) =>
    cy.contains(validationMessage).should("be.visible");

export const accountWasCreatedSuccesfully = (firstAndLastName: string) =>
    cy
        .get("#welcome")
        .should("contain", "Welcome")
        .and("contain", firstAndLastName);

export const eachProducttHasImageAndPrice = () => {
    cy.get(singleItemSelector).each((item) => {
        cy.wrap(item)
            .find(".product_item_image_container")
            .should("have.attr", "href");
        cy.wrap(item)
            .find(".product_item_details_price")
            .invoke("text")
            .should("exist");
    });
};

export const eachResultContainsSearchedPhrase = (phrase: string) => {
    cy.get(singleItemSelector).each((item) => {
        cy.wrap(item).find(".product_item_details_name").should("contain", phrase);
    });
};

export const resultsChanged = (initialCount: number, filteredCount: number): boolean => {
    return filteredCount !== initialCount;
};