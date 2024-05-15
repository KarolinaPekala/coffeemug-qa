# E-commerce Website Testing

1. Searching through existing e-commerce websites, I couldn't find any that didn't use captcha. Bot verification appeared not only during creating a new account but also when logging into an existing one. That's why I tried to bypass it, for example, by adding the following code in beforeEach()
   ```
   //Disable CAPTCHA for the duration of the test
    cy.intercept('POST', '**/catpcha_endpoint_part/**', (req) => {
        req.reply({ captchaPassed: true });
    });
    cy.visit('')
   ```

   However, it didn't help. The only solution to get rid of captcha turned out to be designing my own website. I found a free solution, which is not perfect because it doesn't allow filtering products. As a compensation, I added validation for each product on the list, whether it has an image and price (eachProductHasImageAndPrice()). 


2. To standardize tests and make them independent, before each test (in the second context), I added the creation of a new account sending the API request (which also significantly sped up the tests compared to creating an account in the UI).


3. All the tests can be found in the **e-commerce-website.cy.ts** file. They are divided into two contexts: the 1st contains tests related to **user registration**, the 2nd contains tests related to **actions which user might perform** on the website (searching for products, opening product detailed view, adding it to the basket)


## Tests execution
4. To run the tests in the Cypress runner paste the following in the Terminal:
   
    ```
    npx cypress open
     ```
     next double-click E2E Testing box, then select the browser and click "Start E2E Testing in {browser}" button. After that just click the spec file and wait for the tests execution. 

  

6. To run the tests in the headless mode paste the following in the Terminal:
    ```
    npx cypress run
     ```


7. If the above commands don't work, run:
 
    ```
   npm i
    ```

9. Enjoy :)
