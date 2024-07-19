import { Component, OnInit, inject } from "@angular/core";
import { UsersService } from "../../services/Users.service";
import { UserCardComponent } from "../user-card/user-card.component";
import { CommonModule } from "@angular/common";
import { User } from "../../models/user";
import { MatDialog } from "@angular/material/dialog";
import { CreateEditUserComponent } from "../create-edit-user/create-edit-user.component";

@Component({
  selector: 'users-list',
  standalone: true,
  imports: [UserCardComponent, CommonModule ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent implements OnInit {
  public readonly users$ = this.usersService.users$
  private readonly dialog = inject(MatDialog)

  constructor(
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.usersService.loadUsers()
  }

  onDelete(id: number): void {
    this.usersService.deleteUser(id)
  }

  onDialog(user?: User): void {
    let isEdit: boolean = false

    if (user) {
      isEdit = true
    }

    const dialogRef = this.dialog.open<CreateEditUserComponent, {user?: User, isEdit: boolean}>(CreateEditUserComponent, {
      data: {
        user: user,
        isEdit
      }
    })

    dialogRef.afterClosed().subscribe((res) => {
      if (isEdit && res) {
        this.usersService.editUser(res)
      } else if (res && isEdit === false) {
        this.usersService.addUser(res)
      }
    })
  }
}