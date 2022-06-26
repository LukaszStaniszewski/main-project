import { ActionWithPayload } from "../../utils/store.utils";

export enum LOCAL_ACTION_TYPES {
   SET_LANGUAGE = "SET_LANGUAGE",

}

export type SetLanguage = ActionWithPayload<LOCAL_ACTION_TYPES.SET_LANGUAGE, string>

export type LocalAction = SetLanguage