import { Component, OnInit, inject } from "@angular/core";
import { UserCardComponent } from "../user-card/user-card.component";
import { CommonModule } from "@angular/common";
import { User } from "../../models/user";
import { MatDialog } from "@angular/material/dialog";
import { CreateEditUserComponent } from "../create-edit-user/create-edit-user.component";
import { Store } from "@ngrx/store";
import { usersActions } from "../../states/users/users.actions";
import { selectUser } from "../../states/users/users.selectors";

@Component({
  selector: 'users-list',
  standalone: true,
  imports: [UserCardComponent, CommonModule ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent implements OnInit {
  private readonly store = inject(Store)
  public readonly users$ = this.store.select(selectUser)
  private readonly dialog = inject(MatDialog)

  ngOnInit(): void {
    this.store.dispatch(usersActions.loadUsers())
  }

  onDelete(id: number): void {
    this.store.dispatch(usersActions.deleteUser({id}))
  }

  onDialog(user?: User): void {
    let isEdit: boolean = false

    if (user) {
      isEdit = true
    }

    const dialogRef = this.dialog.open<CreateEditUserComponent, {user?: User, isEdit: boolean}>(CreateEditUserComponent, {
      data: {
        user: user,
        isEdit: isEdit,
      }
    })

    dialogRef.afterClosed().subscribe((res) => {
      console.log(res);
      if (isEdit && res) {
        this.store.dispatch(usersActions.editUser({ user: { ...user, ...res } }))
      } else if (res && isEdit === false) {
        this.store.dispatch(usersActions.addUser({ user: { ...user, ...res } }))
      }
    })
  }
}