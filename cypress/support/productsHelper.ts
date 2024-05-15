
export const searchForProduct = (product: string) => cy.get('#txtQuickSearch').type(product + "{enter}")

export const selectStoreCategory = (category: string) => {
    cy.get('[data-lang="Store"]').last().trigger('mouseover')
    cy.get('.categories_container').last().within(() => {
        cy.contains('.single_category_item', category).click({force: true})
    })
}

export const searchResults = () => cy.get('#browse_search_results')

export const selectProductByItsTitle = (title: string) => cy.get(`[title="${title}"]`).first().click()

export const addToCartButton = () => cy.get('[data-lang="Add to Cart"]')

export const productAddedToCartModal = () => cy.contains('#softadd-modal-title', 'Product Successfully Added to Cart')

export const proceedToCheckout = () => cy.contains('button', ' proceed to checkout')

export const itemInBasket = () => cy.get('.basket_item')

export const singleItemSelector = "#browse_products_container .product_item";