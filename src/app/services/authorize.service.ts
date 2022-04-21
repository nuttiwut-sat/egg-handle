import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { CrudService, T } from './crud.service';
import { IUser } from '../models/employee.model';
import { PageControllerService } from './page-controller.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthorizeService {
  public isLogin$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  public user$: BehaviorSubject<IUser | null> =
    new BehaviorSubject<IUser | null>(null);
  farm$: any;

  constructor(
    private crudService: CrudService,
    private pageService: PageControllerService
  ) { }

  public login(username: string, password: string): Observable<IUser> {
    this.pageService.isLoading$.next(true);
    return this.crudService
      .post<IUser>('/auth/login', {
        username: username,
        password: password,
      })
      .pipe(
        map((res: IUser) => {
          if (res.accessToken) {
            this.setToken(res.accessToken);
          }
          this.user$.next(res);

          this.pageService.isLoading$.next(false);
          return res as IUser;
        }),
        catchError((error) => {
          this.pageService.isLoading$.next(false);
          return throwError(error);
        })
      );
  }

  public register(
    email: string,
    username: string,
    name: string,
    password: string,
    udid: string,
    lat: number,
    long: number
  ): any {
    this.pageService.isLoading$.next(true);
    return this.crudService.post<IUser>('/auth/register', {
      email: email,
      username: username,
      name: name,
      password: password,
      udid: udid,
      lat: lat,
      long: long,
    });
  }

  public logout() {
    localStorage.removeItem('token');
    this.isLogin$.next(false);
    this.user$.next(null);
  }

  public getUserByToken(): Observable<IUser> {
    this.pageService.isLoading$.next(true);
    return this.crudService.post<IUser>('/auth/get-user-by-token').pipe(
      map((res: IUser) => {
        if (res.accessToken) {
          this.setToken(res.accessToken);
        }
        this.user$.next(res);
        this.pageService.isLoading$.next(false);
        return res as IUser;
      }),
      catchError((error) => {
        this.pageService.isLoading$.next(false);
        return throwError(error);
      })
    );
  }

  public setToken(token: string): void {
    localStorage.setItem('token', token);
  }
}
