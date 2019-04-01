import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  private baseURL = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public addUser(user: User) {
    return this.http.post(`${this.baseURL}/user`, user);
  }

  public login(user: User) {
    return this.http.post(`${this.baseURL}/user/login`, user);
  }

  public getAllUsers() {
    return this.http.get(`${this.baseURL}/users`);
  }

  public deletUser(user: User) {
    return this.http.post(`${this.baseURL}/user/delete`, user);
  }
}
