import { DisableTopicDropDown, LOCAL_ACTION_TYPES, SetLanguage } from "./local.types";

export const setLanguage = (language: string) : SetLanguage => ({
   type: LOCAL_ACTION_TYPES.SET_LANGUAGE,
   payload:language
})

export const disableTopicDropdown = (disable: boolean): DisableTopicDropDown =>({
   type: LOCAL_ACTION_TYPES.DISABLE_TOPIC_DROPDOWN,
   payload: disable
}) 