export type PublicMembersInterface<T> = {
  [P in keyof T]: T[P]
}
