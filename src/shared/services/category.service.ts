import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from 'rxjs';
import {Category} from "../model/category";
import {Service} from "./service";
import {Project} from "../model/project";

@Injectable({
  providedIn: 'root'
})
export class CategoryService implements Service{
  private configUrl = `${environment.apiUrl}/categories`;

  constructor(private http: HttpClient) {

  }

  public findAll$(): Observable<Category[]> {
    return this.http.get<Category[]>(this.configUrl);
  }

  public findById$(id:number): Observable<Category> {
    return this.http.get<Category>(`${this.configUrl}/${id}`);

  }

  public update$(category: Category): Observable<any> {
    return this.http.put<Category>(`${this.configUrl}/${category?.id}`,category);
  }

  public delete$(category: Category): Observable<any> {
    return this.http.delete<void>(`${this.configUrl}/${category?.id}`);
  }

  public insert$(category: Category): Observable<any> {
    return this.http.post<Category>(`${this.configUrl}`,category);
  }

  public findProjectsByCategory(id: number): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.configUrl}/${id}/projects`);
  }
}
