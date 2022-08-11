import "./commands";
// import {Cypress} from "cypress"
/// <reference types="cypress" />
import { AppState } from "../../src/store/root-reducer";

type LoginResponseType = "success" | "error" | "blocked";
type RegistrationResponseType = "success" | "error";
interface ReduxState {
   reducer: keyof AppState;
   reducerValue: string;
}

declare global {
   namespace Cypress {
      interface Chainable<Subject> {
         getBySelector(selector: string, ...args: any): Chainable<Subject>;
         login(options: LoginResponseType, email?: string, password?: string): Chainable<Subject>;
         registration(responseType: RegistrationResponseType): Chainable<Subject>;
         logout(responseType: "success" | "error"): Chainable<Subject>;
         getState({ reducer, reducerValue }: ReduxState): Chainable<Subject>;
         dispatchAction(type: string, payload: any): Chainable<Subject>;
         loginByReduxState(email: string, password: string, url?: string): Chainable<Subject>;
      }
   }
}
