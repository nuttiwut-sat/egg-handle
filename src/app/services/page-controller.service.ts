import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageControllerService {

  constructor() { }
  public isMainpage$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
}
