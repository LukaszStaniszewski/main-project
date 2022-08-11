import { API_URL } from "../../src/api/axios-instance.api";

describe("user page owned by logged in user", () => {
   it("correctly shows user page, of a user that has collections", () => {
      cy.loginByReduxState(
         Cypress.env("email"),
         Cypress.env("password"),
         `/user/${Cypress.env("username")}`
      );

      cy.getBySelector("user-page-new-collection-button")
         .should("exist")
         .and("have.text", "New Collection");

      cy.getBySelector("user-page-greeting").should(
         "have.text",
         `Hello ${Cypress.env("username")}!`
      );

      cy.getBySelector("user-page-collection-count").should(
         "contain.text",
         "Collections"
      );

      cy.getBySelector("user-page-table")
         .should("exist")
         .and("contain.text", "Fantasy books");
   });

   it("corretly shows user page, of a user that doesn't have collections", () => {
      cy.loginByReduxState(
         Cypress.env("userWithoutCollectionsEmail"),
         Cypress.env("password"),
         `/user/${Cypress.env("userWithoutCollectionsName")}`
      );

      cy.getBySelector("user-page-info")
         .should("exist")
         .and("contain.text", "No projects");

      cy.getBySelector("user-page-folder-icon").should("exist");

      cy.getBySelector("user-page-new-collection-button")
         .should("exist")
         .and("have.text", "New Collection");

      cy.getBySelector("user-page-greeting").should(
         "have.text",
         `Hello ${Cypress.env("userWithoutCollectionsName")}!`
      );
   });
});

describe("user page owned by another user", () => {
   it("correctly shows user page of a user that has collections", () => {
      cy.visit(`/user/${Cypress.env("username")}`);

      cy.getBySelector("user-page-new-collection-button").should("not.exist");

      cy.getBySelector("user-page-greeting").should("not.exist");

      cy.getBySelector("user-page-table")
         .should("exist")
         .and("contain.text", "Fantasy books");
   });

   it("correctly shows user page of a use that doesn't have collections", () => {
      cy.visit(`/user/${Cypress.env("userWithoutCollectionsName")}`);

      cy.getBySelector("toast").should("contain.text", "This user has no collections");

      cy.getBySelector("user-page-new-collection-button").should("not.exist");

      cy.getBySelector("user-page-greeting").should("not.exist");

      cy.getBySelector("user-page-table").should("not.exist");
   });

   it("shows NotFound page when url is incorrect, and removes it when user press go back button", () => {
      cy.visit(`/user/${Cypress.env("username")}`);

      cy.visit(`/user/notExistingUrl`);

      cy.getBySelector("404-page").should("exist");

      cy.getBySelector("404-page-back-button").click();

      cy.location("pathname").should("eq", `/user/${Cypress.env("username")}`);

      cy.getBySelector("404-page").should("not.exist");
   });
});

describe("user page routes", () => {
   beforeEach(() => {
      cy.intercept(`${API_URL.GET_COLLECTIONS_BY_USER}/${Cypress.env("username")}`).as(
         "collection"
      );
      cy.loginByReduxState(
         Cypress.env("email"),
         Cypress.env("password"),
         `/user/${Cypress.env("username")}`
      );
   });
   it("correctly redirects to create collection page, when user clicks new collection button", () => {
      cy.getBySelector("user-page-new-collection-button").click();

      cy.location("pathname").should("eq", "/new/collection");
   });

   it("correctly redirects to collection page, when user clicks on collection", () => {
      cy.wait("@collection").then((response) => {
         expect(response.response.statusCode === 200);
      });

      cy.get("tbody > .cursor-pointer > :nth-child(2)").click();

      cy.getState({
         reducer: "collection",
         reducerValue: "collectionsWihoutItems",
      }).then((collection) => {
         //@ts-ignore
         cy.location("pathname").should("eq", `/collection/${collection[0]._id}`);
      });
   });
});
