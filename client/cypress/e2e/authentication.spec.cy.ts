/// <reference types="cypress" />

import { API_URL } from "../../src/api/axios-instance.api";

describe("sign-in", () => {
   beforeEach(() => {
      cy.visit(Cypress.env("signin_url"));
   });
   it("successful signs in with **default values** then redirects to user page and shows toast with success message", () => {
      cy.login("success");

      cy.location("pathname").should("eq", `/user/Frank_100`);

      cy.getBySelector("toast").should("have.text", "Info: Sign up as Frank_100");
   });

   it("successful signs in with **valid credentials** then redirects to user page and shows toast with success message", () => {
      cy.login("success", Cypress.env("email"), Cypress.env("password"));

      cy.location("pathname").should("eq", `/user/admin`);

      cy.getBySelector("toast").should("have.text", "Info: Sign up as admin");
   });

   it("user stays sign in when page is refreshed", () => {
      cy.intercept("GET", `${API_URL.GET_COLLECTIONS_BY_USER}/${Cypress.env("username")}`).as(
         "getCollections"
      );

      cy.login("success", Cypress.env("email"), Cypress.env("password"));

      cy.reload();

      cy.wait("@getCollections");

      cy.getState({ reducer: "user", reducerValue: "currentUser" }).should(
         "have.a.property",
         "name"
      );
   });

   it("throws and error when user inserts **invalid credentials**, and shows toast with message 'invalid credentials'", () => {
      cy.login("error", Cypress.env("email"), "wrongpassword");

      cy.location("pathname").should("eq", "/signin");

      cy.getBySelector("toast").should("have.text", "Info: Sign in failed: Invalid credentials");
   });

   it("throws an error when **blocked user** signs in and shows toast with messag: 'your account has been blocked'", () => {
      cy.login("blocked", Cypress.env("blockedUser"), Cypress.env("password"));

      cy.location("pathname").should("eq", "/signin");

      cy.getBySelector("toast").should(
         "have.text",
         "Info: Sign in failed: Your account has been blocked"
      );
   });
});

describe("sign up", () => {
   beforeEach(() => {
      cy.visit(Cypress.env("signup_url"));
   });
   it("successfuly signs up when user fills required inputs, redirects to user page and shows success toast", () => {
      cy.registration("success");

      cy.location("pathname").should("eq", "/user/test80");

      cy.getBySelector("toast").should("have.text", "Info: Sign up as test80");
   });

   it("throws an error and shows error toast when password and confirm password are not the same ", () => {
      cy.getBySelector("signup-email").type("test80@gmail.com");
      cy.getBySelector("signup-username").type("test80");
      cy.getBySelector("signup-password").type("password");
      cy.getBySelector("signup-confirm-password").type("differentPassword");
      cy.getBySelector("signup-submit").click();

      cy.location("pathname").should("eq", Cypress.env("signup_url"));

      cy.getBySelector("toast").should("have.text", "Info: Passwords are not the same");
   });

   it("throws and error and shows error toast when email, username are taken", () => {
      cy.registration("error");

      cy.location("pathname").should("eq", Cypress.env("signup_url"));

      cy.getBySelector("toast").should(
         "have.text",
         "Info: Sign up failed: Email or username are taken"
      );
   });
});

describe("logout", () => {
   beforeEach(() => {
      cy.loginByReduxState(Cypress.env("email"), Cypress.env("password"), "/signin");
   });
   it("removes user from redux state, clears user tokens, and redirects to home page after successfull logout", () => {
      cy.logout("success");

      cy.getState({ reducer: "user", reducerValue: "currentUser" }).should("be.null");

      cy.getBySelector("navbar-sign-in").should("have.text", "Sign In");

      cy.location("pathname").should("eq", "/");
   });
});

// let appAuth = window.Cypress ? AppAuth0 : withAuthenticationRecquired(AppAuth0)

export {};
