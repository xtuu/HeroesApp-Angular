import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { Auth } from '../interfaces/auth.interfaces';

import { tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private baseUtl: string = environment.baseUrl;
  private _auth: Auth | undefined;

  get auth() {
    return { ...this._auth }
  }

  constructor(
    private http: HttpClient
  ) { }


  login() {
    return this.http.get<Auth>(`${this.baseUtl}/usuarios/1`)
      .pipe(
        tap(auth => this._auth = auth)
      )
  }


}
