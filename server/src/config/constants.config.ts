// type USER_LOGGED_IN = typeof Values_TO_Omit.USER_LOGGED_IN[number]

export const Values_TO_Omit = {
   USER_LOGGED_IN: ["password", "createdAt", "lastLogin", "email"] as const,
   SEND_USERS_REQUEST: ["-password", "-createdAt", "-__v"] as const,
}

export enum ErrorMessages {
   EMAIL_OR_PASSWORD_TAKEN = "Email or password has been taken",
   NOT_AUTHENTICATED = "Invalid credentials",
   ACCOUNT_HAS_BLOCKED_STATUS = "Your account has been blocked",
   NOT_AUTHORIZED = "You are not authorized to make this acction",
   USER_DELETION_FAILURE = "User/s weren't deleted",
   USER_UPDATE_FAILURE = "User/s weren't updated",
}

const collectionTopics = ["books", "clothes", "music", "movies", "painting", "sculpture", "banknot", "postard"] as const
export type CollectionTopics = typeof collectionTopics[number]
