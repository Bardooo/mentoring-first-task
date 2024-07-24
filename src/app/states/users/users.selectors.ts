import { createFeatureSelector, createSelector } from "@ngrx/store";
import { USERS_KEY, UsersState } from "./users.reducer";

export const usersState = createFeatureSelector<UsersState>(USERS_KEY)

export const selectUser = createSelector(usersState, (state) => state.users)