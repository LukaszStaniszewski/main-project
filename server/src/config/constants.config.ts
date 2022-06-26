// type USER_LOGGED_IN = typeof Values_TO_Omit.USER_LOGGED_IN[number]

export const Values_TO_Omit = {
   USER_LOGGED_IN: ["password", "createdAt", "lastLogin", "email"] as const,
   SEND_USERS_REQUEST: ["-password", "-createdAt", "-__v"] as const,
}

