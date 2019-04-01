import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  public loggedIn: boolean = false;
  public username: string;
  public emailId: string;
  public isAdmin: boolean;

  constructor() { }
}
