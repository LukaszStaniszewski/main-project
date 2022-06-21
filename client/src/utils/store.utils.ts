export type ActionWithPayload<T, P> = {
   type: T,
   payload: P
}

export type Action<T> = {
   type: T;
}
