import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Entry} from "../model/entry";
import {environment} from "../../environments/environment";
import {Observable} from 'rxjs';
import {Category} from "../model/category";
import {User} from "../model/user";
import {Service} from "./service";

@Injectable({
  providedIn: 'root'
})
export class UserService implements Service{
  private configUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {

  }

  public findAll$(): Observable<User[]> {
    return this.http.get<User[]>(this.configUrl);
  }

  public findById$(id:number): Observable<User> {
    return this.http.get<User>(`${this.configUrl}/${id}`);
  }

  public update$(user: User): Observable<any> {
    return this.http.put<User>(`${this.configUrl}/${user?.id}`,user);
  }

  public delete$(user: User): Observable<void> {
    return this.http.delete<void>(`${this.configUrl}/${user?.id}`);
  }

  public insert$(user: User): Observable<User> {
    return this.http.post<User>(`${this.configUrl}`,user);
  }


}
