import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PageControllerService } from './page-controller.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  constructor(
    private httpClient: HttpClient,
    public pageService: PageControllerService
  ) {}

  /**
   * Get Method
   * @template T
   * @param {string} api
   * @param {*} [param=null]
   * @returns {Observable<T>}
   * @memberof CrudService
   */
  public get<T>(api: string, param: Record<string, any> = {}): Observable<T> {
    this.pageService.isLoading$.next(true);
    const options = {
      params: {
        ...param,
      },
    };
    return this.httpClient.get<T>(environment.apiBaseUrl + api, options).pipe(
      map((res: any) => {
        this.pageService.isLoading$.next(false);
        return res.result as T;
      }),
      catchError((error) => {
        this.pageService.isLoading$.next(false);
        return throwError(error);
      })
    );
  }

  /**
   * Post Method
   * @template T
   * @param {string} api
   * @param {*} body
   * @returns {Observable<T>}
   * @memberof CrudService
   */
  public post<T>(
    api: string,
    body: Record<string, any> | any = {},
    header: any = {}
  ): Observable<T> {
    this.pageService.isLoading$.next(true);
    return this.httpClient
      .post(environment.apiBaseUrl + api, body, header)
      .pipe(
        map((res: any) => {
          this.pageService.isLoading$.next(false);
          return res.result as T;
        }),
        catchError((error) => {
          this.pageService.isLoading$.next(false);
          return throwError(error);
        })
      );
  }

  /**
   * Put Method
   * @template T
   * @param {string} api
   * @param {*} body
   * @param {*} [param=null]
   * @return {*}  {Observable<T>}
   * @memberof CrudService
   */
  public put<T>(
    api: string,
    body: Record<string, any>,
    param: Record<string, any> = {}
  ): Observable<T> {
    this.pageService.isLoading$.next(true);
    const options = {
      params: {
        ...param,
      },
    };
    return this.httpClient
      .put<T>(environment.apiBaseUrl + api, body, options)
      .pipe(
        map((res: any) => {
          this.pageService.isLoading$.next(false);
          return res.result as T;
        }),
        catchError((error) => {
          this.pageService.isLoading$.next(false);
          return throwError(error);
        })
      );
  }

  /**
   * Patch Method
   * @template T
   * @param {string} api
   * @param {*} body
   * @param {*} [param=null]
   * @returns {Observable<T>}
   * @memberof CrudService
   */
  public patch<T>(
    api: string,
    body: Record<string, any>,
    param: Record<string, any> = {}
  ): Observable<T> {
    this.pageService.isLoading$.next(true);
    const options = {
      params: {
        ...param,
      },
    };
    return this.httpClient
      .patch(environment.apiBaseUrl + api, body, options)
      .pipe(
        map((res: any) => {
          this.pageService.isLoading$.next(false);
          return res.result as T;
        }),
        catchError((error) => {
          this.pageService.isLoading$.next(false);
          return throwError(error);
        })
      );
  }

  public delete<T>(api: string): Observable<T> {
    this.pageService.isLoading$.next(true);
    return this.httpClient.delete(api).pipe(
      map((res: any) => {
        this.pageService.isLoading$.next(false);
        return res.result as T;
      }),
      catchError((error) => {
        this.pageService.isLoading$.next(false);
        return throwError(error);
      })
    );
  }
}

export interface T {
  statusCode: number;
  message: string;
  encryption: number;
  result: T;
  errors: any;
  'x-request-id': string;
  processing_time: number;
}
