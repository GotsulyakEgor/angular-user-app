import { Injectable } from '@angular/core';
import {map} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HttpService {


  constructor(private http: HttpClient) {
  }

  getUsers() {
    return this.http.get("http://localhost:3000/users")
      .pipe(map((res: any) => {
        return res
      }))
  }

  getUserById(id: number) {
    return this.http.get(`http://localhost:3000/users/${id}`)
      .pipe(map((res: any) => {
        return res
      }))
  }


  editUser(data: any, id: number) {
    return this.http.patch(`http://localhost:3000/users/${id}`, data)
      .pipe(map((res: any) => {
        return res
      }))
  }




}
