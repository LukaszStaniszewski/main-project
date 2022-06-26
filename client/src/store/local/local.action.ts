import { LOCAL_ACTION_TYPES, SetLanguage } from "./local.types";

export const setLanguage = (language: string) : SetLanguage => ({
   type: LOCAL_ACTION_TYPES.SET_LANGUAGE,
   payload:language
})