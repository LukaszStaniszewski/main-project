describe("collection page owned by logged in user", () => {
   beforeEach(() => {
      cy.loginByReduxState(
         Cypress.env("email"),
         Cypress.env("password"),
         Cypress.env("collection_page_url")
      );
   });

   it("correctly displays collection page", () => {
      cy.getBySelector("collection-page-title").should("contain.text", "Fantasy books");

      cy.getBySelector("collection-page-menu").should("exist");
      cy.getBySelector("collection-page-newItem-button").should("exist");
      cy.getBySelector("collection-page-updateItem-button").should("exist");

      cy.getBySelector("collection-page-table").should("exist");

      cy.getState({ reducer: "item", reducerValue: "items" }).then((state) => {
         expect(state).to.have.length(4);
      });
   });

   it("click on new item button, redirects to create item page", () => {
      cy.getBySelector("collection-page-newItem-button").click();

      cy.location("pathname").should("eq", "/new/item");

      cy.contains("Create Item");
   });
});

describe("collection page owned by another user", () => {
   beforeEach(() => {
      cy.visit(Cypress.env("collection_page_url"));
   });

   it("correctly displays collection page", () => {
      cy.getBySelector("collection-page-title").should("contain.text", "Fantasy books");

      cy.getBySelector("collection-page-menu").should("not.exist");
      cy.getBySelector("collection-page-newItem-button").should("not.exist");
      cy.getBySelector("collection-page-updateItem-button").should("not.exist");

      cy.getBySelector("collection-page-table").should("exist");

      cy.getState({ reducer: "item", reducerValue: "items" }).then((state) => {
         expect(state).to.have.length(4);
      });
   });

   it("displays 404 page when collection doesn't exist, click on go back button redirects to collection", () => {
      cy.visit("/collection/notExistingCollection404");

      cy.getBySelector("404-page").should("exist");

      cy.getBySelector("404-page-back-button").click();

      cy.location("pathname").should("eq", Cypress.env("collection_page_url"));
   });
});

describe("collection page routes", () => {
   beforeEach(() => {
      cy.visit(Cypress.env("collection_page_url"));
   });
   it("click on item redirects to item page", () => {
      cy.get("tbody > :nth-child(1) > :nth-child(3)").click();

      cy.getState({ reducer: "item", reducerValue: "items" }).then((state) => {
         //@ts-ignore
         cy.location("pathname").should("eq", `/item/${state[0]._id}`);

         cy.contains("The Way of Kings");
      });
   });
});
