/// <reference types="cypress" />

import { API_URL } from "../../client/src/api/axios-instance.api";
import "cypress-file-upload";

Cypress.Commands.add("getBySelector", (selector, ...args) => {
   return cy.get(`[data-test=${selector}]`, ...args);
});

Cypress.Commands.add("login", (loginResponseType = "success", email, password) => {
   const signinPath = Cypress.env("signin_url");

   cy.intercept("POST", API_URL.SIGN_IN).as("loginUser");

   const log = Cypress.log({
      name: "login",
      displayName: "LOGIN",
      message: [`🔐 Authentication | ${email}`],
      autoEnd: false,
   });

   cy.location("pathname").then((currentPath) => {
      if (currentPath !== signinPath) {
         cy.visit(signinPath);
      }
   });

   log.snapshot("before");

   if (email) {
      cy.getBySelector("signin-email").clear().type(email);
   }
   if (password) {
      cy.getBySelector("signin-password").clear().type(password);
   }

   cy.getBySelector("signin-submit").click();

   cy.wait("@loginUser").then((res) => {
      if (loginResponseType === "success") {
         expect(res.response?.body).to.haveOwnProperty("accessToken");
         expect(res.response?.body).to.haveOwnProperty("refreshToken");
      } else if (loginResponseType === "error") {
         expect(res.response?.body).contains({ message: "Invalid credentials" });
         expect(res.response?.statusCode).be.greaterThan(399);
      } else if (loginResponseType === "blocked") {
         expect(res.response?.body).contains({
            message: "Your account has been blocked",
         });
         expect(res.response?.statusCode).be.greaterThan(399);
      } else {
         throw new Error("respsonse type is required");
      }
   });
   log.snapshot("after");
   log.end();
});

Cypress.Commands.add("registration", (responseType) => {
   const log = Cypress.log({
      name: "sign-in",
      displayName: "SignIn",
      message: [`🔐 Registration | expected response ${responseType}`],
      autoEnd: false,
   });

   cy.intercept("POST", API_URL.SIGN_UP, (req) => {
      if (responseType === "success") {
         req.reply({ fixture: "registration" });
      } else {
         req.reply(409, { message: "Email or username are taken" });
      }
   }).as("signup");
   log.snapshot("before");

   cy.getBySelector("signup-email").type("test80@gmail.com");
   cy.getBySelector("signup-username").type("test80");
   cy.getBySelector("signup-password").type("password");
   cy.getBySelector("signup-confirm-password").type("password");
   cy.getBySelector("signup-submit").click();

   cy.wait("@signup").then((res) => {
      if (responseType === "success") {
         expect(res.response?.body).to.haveOwnProperty("accessToken");
         expect(res.response?.body).to.haveOwnProperty("refreshToken");
      } else {
         expect(res.response?.statusCode).be.greaterThan(399);
      }
   });
   log.snapshot("after");
   log.end();
});

Cypress.Commands.add("logout", (responseType = "success") => {
   cy.intercept("DELETE", API_URL.LOG_OUT).as("logoutUser");

   const log = Cypress.log({
      name: "logout",
      displayName: "Logout",
      message: [`expected result ${responseType}`],
      autoEnd: false,
   });

   log.snapshot("before");

   cy.getBySelector("navbar-dropdown").click().getBySelector("logout-button").click();

   cy.wait("@logoutUser").then((res) => {
      if (responseType === "success") {
         expect(res.response?.statusCode).to.be.equal(200);
      } else {
         expect(res.response?.statusCode).to.be.greaterThan(399);
      }
   });
   log.snapshot("after");
   log.end();
});

Cypress.Commands.add("getState", ({ reducer, reducerValue }) => {
   cy.window()
      .its("store")
      .invoke("getState")
      .then((state) => {
         return state[reducer][reducerValue];
      });
});

Cypress.Commands.add("dispatchAction", (type, payload) => {
   cy.window({ log: false }).then((win) => {
      //@ts-ignore
      win.store.dispatch({ type: type, payload: payload });
   });
});

Cypress.Commands.add("loginByReduxState", (email, password, url = "/signin") => {
   const log = Cypress.log({
      name: "loginbyreduxstate",
      displayName: "LOGIN BY REDUX_STATE",
      message: [`🔐 Authentication | ${email}`],
      autoEnd: false,
   });
   cy.intercept("POST", API_URL.SIGN_IN).as("loginUser");

   cy.location("pathname").then((currentPath) => {
      if (currentPath !== url) {
         cy.visit(url);
      }
   });

   cy.dispatchAction("SIGN_IN_START", { email, password });
   log.snapshot("before");

   cy.wait("@loginUser").then((res) => {
      expect(res.response?.body).to.haveOwnProperty("accessToken");
      expect(res.response?.body).to.haveOwnProperty("refreshToken");
   });

   log.snapshot("after");
   log.end();
});

Cypress.Commands.add("deleteCollectionByRedux", (collectionId) => {
   cy.intercept("DELETE", `${API_URL.DELETE_COLLECTION}/${collectionId}`).as(
      "deleteCollection"
   );

   cy.dispatchAction("DELETE_COLLECTION_START", collectionId);

   cy.wait("@deleteCollection").then((res) => {
      expect(res.response.statusCode).to.equal(200);
   });
});

Cypress.Commands.add("urlShouldEq", (url) => {
   cy.location("pathname").should("eq", url);
});

export {};
