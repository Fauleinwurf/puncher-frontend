import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Entry} from "../model/entry";
import {environment} from "../../environments/environment";
import {Observable} from 'rxjs';
import {Service} from "./service";

@Injectable({
  providedIn: 'root'
})
export class EntryService implements Service{
  private configUrl = `${environment.apiUrl}/entries`;

  constructor(private http: HttpClient) {

  }

  public findAll$(): Observable<Entry[]> {
    return this.http.get<Entry[]>(this.configUrl);
  }

  public findById$(id: number): Observable<Entry> {
    return this.http.get<Entry>(`${this.configUrl}/${id}`);
  }

  public update$(entry: any): Observable<any> {
    return this.http.put<Entry>(`${this.configUrl}/${entry?.id}`,entry);
  }

  public delete$(entry: Entry): Observable<void> {
    return this.http.delete<void>(`${this.configUrl}/${entry?.id}`);
  }

  public insert$(entry: Entry): Observable<any> {
    return this.http.post<Entry>(`${this.configUrl}`,entry);
  }

}
