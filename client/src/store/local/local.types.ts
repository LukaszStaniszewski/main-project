import { ActionWithPayload } from "../../utils/store.utils";

export enum LOCAL_ACTION_TYPES {
   SET_LANGUAGE = "SET_LANGUAGE",
   DISABLE_TOPIC_DROPDOWN = "DISABLE_TOPIC_DROPDOWN"
}

export type LocalAction = SetLanguage | DisableTopicDropDown

export type SetLanguage = ActionWithPayload<LOCAL_ACTION_TYPES.SET_LANGUAGE, string>
export type DisableTopicDropDown = ActionWithPayload<LOCAL_ACTION_TYPES.DISABLE_TOPIC_DROPDOWN, boolean>