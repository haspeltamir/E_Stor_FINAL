import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../models/User';
import { IUserLogin } from '../components/interfaces/IUserLogin';
import { HttpClient } from '@angular/common/http';
import { USER_LOGIN_URL, USER_REGISTER_URL } from '../constants/url';
import { IUserRegister } from '../components/interfaces/IUserRegister';
import { MatSnackBar } from '@angular/material/snack-bar';

const USER_KEY = 'User';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  
  private userSubject = new BehaviorSubject<User>(
    this.getUserFromLocalStorage()
  );
  public userObservable: Observable<User>;

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
    this.userObservable = this.userSubject.asObservable();
  }

  public get currentUser(): User {
    return this.userSubject.value;
  }

  login(userLogin: IUserLogin): Observable<User> {
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.snackBar.open(
            `Welcome to T&A E-Store ${user.name}`,
            `Login Successful`,{duration:3000}
          );
        },
        error: (errorResponse) => {
          this.snackBar.open(errorResponse.error, 'Login Failed',{duration:3000});
        },
      })
    );
  }

  register(userRegister: IUserRegister): Observable<User> {
    return this.http.post<User>(USER_REGISTER_URL, userRegister).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.snackBar.open(
            `Welcome to T&A E-Store ${user.name}`,
            `register Successful`,{duration:3000}
          );
        },
        error: (errorResponse) => {
          this.snackBar.open(errorResponse.error, 'register Failed',{duration:3000});
        },
      })
    );
  }

  private setUserToLocalStorage(user: User) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  private getUserFromLocalStorage(): User {
    const userJson = localStorage.getItem(USER_KEY);
    if (userJson) {
      return JSON.parse(userJson) as User;
    }
    return new User();
  }

  logOut() {
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    localStorage.clear();
    window.location.reload();
  }
}
