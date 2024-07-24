import { inject } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { UsersApiService } from "../../services/UsersApi.service"
import { usersActions } from "./users.actions"
import { catchError, map, of, switchMap } from "rxjs"
import { User } from "../../models/user"

export const usersEffects = createEffect(
  () => {
    const actions$ = inject(Actions)
    const apiService = inject(UsersApiService)

    return actions$.pipe(
      ofType(usersActions.loadUsers),
      switchMap(
        () => apiService.getUsers().pipe(
          map((users: User[]) => {
            return usersActions.loadUsersSuccess({users})
          }),
          catchError(error => {
            return of(usersActions.loadUsersFailure({error}))
          })
        )
      )
    )
  }, {functional: true}
)