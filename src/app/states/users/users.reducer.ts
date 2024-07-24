import { createFeature, createReducer, on } from "@ngrx/store"
import { User } from "../../models/user"
import { usersActions } from "./users.actions"

export interface UsersState {
  users: User[],
  loading: boolean,
  error: string | null,
}

export const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
}

export const USERS_KEY = 'users'

export const usersFeature = createFeature({
  name: USERS_KEY,
  reducer: createReducer(
    initialState,
    on(usersActions.loadUsers, (state) => ({
      ...state,
      loading: true,
      error: null,
    })),
    on(usersActions.loadUsersSuccess, (state, {users}) => ({
      ...state,
      users: users, 
      loading: false,
      error: null,
    })),
    on(usersActions.loadUsersFailure, (state, {error}) => ({
      ...state,
      loading: false,
      error: error,
    })),
    on(usersActions.addUser, (state, {user}) => ({
      ...state,
      users: [...state.users, user],
      loading: false,
      error: null,
    })),
    on(usersActions.deleteUser, (state, {id}) => ({
      ...state,
      users: state.users.filter(user => user.id != id),
      loading: false,
      error: null,
    })),
    on(usersActions.editUser, (state, {user}) => ({
      ...state,
      users: state.users.map(item => {
        return item.id === user.id ? user : item
      }),
      loading: false,
      error: null,
    }))
  )
})