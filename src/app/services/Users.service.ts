import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { UsersApiService } from './UsersApi.service';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from './LocalStorage.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private usersSubject$ = new BehaviorSubject<User[]>([]);
  public readonly users$ = this.usersSubject$.asObservable();

  constructor(
    private usersApiService: UsersApiService,
    private localStorage: LocalStorageService,
  ) {}

  loadUsers(): void {
    const LSUsers = this.localStorage.getUsersFromLS("users")

    if (LSUsers) {
      this.usersSubject$.next(LSUsers)
    } else {
      this.usersApiService.getUsers().subscribe(
        (data: User[]) => {
          this.usersSubject$.next(data);
          this.localStorage.setUsersToLS("users", data)
        }
      )
    }
  }

  deleteUser(id: number): void {
    const newList = this.usersSubject$.value.filter(user => user.id !== id)
    this.localStorage.setUsersToLS("users", newList)
    this.usersSubject$.next(newList)
  }

  editUser(user: User): void {
    const id = this.usersSubject$.value.findIndex(item => item.id === user.id)
    this.usersSubject$.value[id] = user
    this.localStorage.setUsersToLS("users", this.usersSubject$.value)
    this.usersSubject$.next(this.usersSubject$.value)
  }

  addUser(user: User): void {
    const newList = [...this.usersSubject$.value, user]
    this.usersSubject$.next(newList)
    this.localStorage.setUsersToLS("users", newList)
  }
}
