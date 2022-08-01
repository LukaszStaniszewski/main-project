import { ActionWithPayload, Action } from "../../utils/store.utils";

export enum LOCAL_ACTION_TYPES {
   SET_LANGUAGE = "SET_LANGUAGE",
   DISABLE_TOPIC_DROPDOWN = "DISABLE_TOPIC_DROPDOWN",
   SHOW_404_PAGE = "SHOW_404_PAGE",
}

export type LocalAction = SetLanguage | DisableTopicDropDown | Show404Page;

export type SetLanguage = ActionWithPayload<LOCAL_ACTION_TYPES.SET_LANGUAGE, string>;
export type DisableTopicDropDown = ActionWithPayload<
   LOCAL_ACTION_TYPES.DISABLE_TOPIC_DROPDOWN,
   boolean
>;
export type Show404Page = ActionWithPayload<LOCAL_ACTION_TYPES.SHOW_404_PAGE, boolean>;
