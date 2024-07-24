import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { User } from "../../models/user";

export const usersActions = createActionGroup({
  source: 'users',
  events: {
    loadUsers: emptyProps(),
    loadUsersSuccess: props<{users: User[]}>(),
    loadUsersFailure: props<{error: string}>(),

    deleteUser: props<{id: number}>(),
    addUser: props<{user: User}>(),
    editUser: props<{user: User}>(),
  }
})