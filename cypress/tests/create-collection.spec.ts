import { API_URL } from "../../client/src/api/axios-instance.api";
import {
   Topic,
   Topics,
} from "../../client/src/components/create-item/item-types/itemTypes";
import { collectionWithItem, optionalFields } from "../data/mocked-data";

enum ToastMessages {
   signIn = "You must be sign in to create collection",
   requiredFields = "You missed required fields!",
   wrongFileType = "File must be of type png, jpg or jpeg",
   defaultInfo = "You won't be able to change a topic, after you add an item.",
   collectionSuccess = "Collection has been saved",
}

const collectionTabFixed = [
   /create collection/i,
   /add items/i,
   /collection name/i,
   /enter description/i,
   /save description/i,
   /drop files/i,
   /done!/i,
];

const addItemsTabsFixed = [
   /Choose collection topic to see possible item fields/i,
   /done!/i,
];

describe("Create Collection tab", () => {
   beforeEach(() => {
      window.sessionStorage.removeItem("topic");

      cy.loginByReduxState(
         Cypress.env("email"),
         Cypress.env("password"),
         "/new/collection"
      );
   });

   it("correctly displays default values on the page", () => {
      collectionTabFixed.forEach((value) => {
         cy.contains(value);
      });
   });

   context("topic selector", () => {
      it("displays topics when user clicks on it then displays selected topic. Correct topic stays when user switches tabs", () => {
         cy.getBySelector("select-dropdown")
            .click()
            .then(($dropdown) => {
               cy.fixture("collection-topics").then((topics: Topics) => {
                  topics.map((topic: Topic) => {
                     expect($dropdown).to.contain(topic);
                  });
                  cy.get("li").contains(topics[0]).click();
                  cy.getBySelector("select-dropdown").should("not.contain", topics[1]);
                  cy.getBySelector("select-dropdown").should("contain", topics[0]);

                  cy.getBySelector("add-items-tab").click();
                  cy.getBySelector("create-collection-tab").click();
                  cy.getBySelector("select-dropdown").should("contain", topics[0]);
               });
            });
      });
   });
});

describe("Add items tab", () => {
   beforeEach(() => {
      window.sessionStorage.removeItem("topic");
      cy.loginByReduxState(
         Cypress.env("email"),
         Cypress.env("password"),
         "/new/collection"
      );
   });

   it("correctly displays default values on the page", () => {
      cy.reload();
      cy.getBySelector("add-items-tab").click();

      addItemsTabsFixed.forEach((value) => {
         cy.contains(value);
      });
   });

   it("correctly displays values when topic is chosen", () => {
      cy.fixture("collection-topics").then((topics: Topics) => {
         window.sessionStorage.setItem("topic", topics[0]);
      });

      cy.reload();
      cy.getBySelector("add-items-tab").click();

      cy.getBySelector(`optional-field-author`).should("exist");

      cy.getBySelector("chosen-field-remove-author").should("not.exist");

      cy.getBySelector("optional-field-author").click();

      cy.getBySelector("chosen-field-remove-author").should("exist");

      cy.getBySelector(`optional-field-author`).should("not.exist");

      cy.getBySelector("chosen-field-remove-author").click();

      cy.getBySelector("chosen-field-remove-author").should("not.exist");

      cy.getBySelector(`optional-field-author`).should("exist");
   });
});

it("create collection phases for happy path", () => {
   window.sessionStorage.removeItem("topic");
   cy.intercept("POST", API_URL.CREATE_COLLECTION_WITH_ITEMS).as("createCollection");
   cy.loginByReduxState(Cypress.env("email"), Cypress.env("password"), "/new/collection");

   cy.getBySelector("create-collection-name").type(collectionWithItem.name);
   cy.getBySelector("markdown-text-area").type(collectionWithItem.description);
   cy.getBySelector("text-area-button").click();

   cy.getBySelector("select-dropdown")
      .click()
      .then(() => {
         cy.get("li").contains("books").click();
      });

   cy.fixture("test picture").then((fileContent) => {
      cy.getBySelector("collection-image-input").attachFile({
         fileContent: fileContent,
         fileName: "test picture.jpg",
         mimeType: "image/jpeg",
      });
   });

   cy.getBySelector("add-items-tab").click();

   cy.getBySelector("create-item-name").type(collectionWithItem.items[0].name);
   cy.getBySelector("creatre-item-id").type(collectionWithItem.items[0].id);

   cy.getBySelector("optional-field-author").click();
   cy.getBySelector("chosen-field-author").type(optionalFields.author);

   cy.getBySelector("optional-field-pages").click();
   cy.getBySelector("chosen-field-pages").type(optionalFields.pages.toString());

   cy.getBySelector("optional-field-description").click();
   cy.getBySelector("chosen-field-description").type(optionalFields.description);

   cy.getBySelector("create-item-submit").click();

   cy.getBySelector("toast").should("contain.text", "Item has been added");

   cy.getBySelector("create-collection-tab").click();

   cy.getBySelector("create-collection-submit").click();

   cy.wait("@createCollection")
      .then((response) => {
         console.log(response);
         expect(response.response.statusCode).to.equal(200);
         expect(response.response.body).to.haveOwnProperty("collectionId");
         return response.response.body.collectionId;
      })
      .then((collectionId) => {
         cy.getBySelector("toast").should(
            "contain.text",
            ToastMessages.collectionSuccess
         );

         cy.deleteCollectionByRedux(collectionId);
      });
});
