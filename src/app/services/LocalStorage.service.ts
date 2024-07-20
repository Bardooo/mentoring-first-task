import { Injectable } from "@angular/core";
import { User } from "../models/user";

@Injectable({
  providedIn: "root",
})
export class LocalStorageService {
  getUsersFromLS(key: string): User[] | null {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : null
  }

  setUsersToLS(key: string, data: User[]): void {
    localStorage.setItem(key, JSON.stringify(data))
  }
}