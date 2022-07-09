export const Values_TO_Omit = {
   USER_LOGGED_IN: ["password", "createdAt", "lastLogin", "email"] as const,
   SEND_USERS_REQUEST: ["-password", "-createdAt", "-__v"] as const,
   SEND_COLLECTION_REQUEST: ["-__v"] as const,
   SEND_ITEMS_REQUEST: ["-__v", "-updatedAt"] as const
}

export enum ErrorMessage {
   EMAIL_OR_PASSWORD_TAKEN = "Email or password has been taken",
   NOT_AUTHENTICATED = "Invalid credentials",
   ACCOUNT_HAS_BLOCKED_STATUS = "Your account has been blocked",
   NOT_AUTHORIZED = "You are not authorized to do this action",
   USER_DELETION_FAILURE = "User/s weren't deleted",
   USER_UPDATE_FAILURE = "User/s weren't updated",
   COLLECTION_TOPIC_ERROR = "Collection topic is invalid",
   ITEM_DELITION_FAILURE = "Item/s weren't deleted",
   COLLECTION_NOT_CREATED = "Collection was not created"
}

export enum SuccessMessage {
   COLLECTION_DELETED = "Collection has been successfully deleted",
   ITEM_DELETED = "Item has been successfully deleted"
}

export const collectionTopics = ["books", "clothes", "music", "movies", "painting", "sculpture", "banknot", "postard"] as const
export type CollectionTopics = typeof collectionTopics[number]


