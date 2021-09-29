import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Entry} from "../model/entry";
import {environment} from "../../environments/environment";
import {Observable} from 'rxjs';
import {Category} from "../model/category";
import {Service} from "./service";
import {Project} from "../model/project";

@Injectable({
  providedIn: 'root'
})
export class ProjectService implements Service{
  private configUrl = `${environment.apiUrl}/projects`;

  constructor(private http: HttpClient) {

  }

  public findAll$(): Observable<Project[]> {
    return this.http.get<Project[]>(this.configUrl);
  }

  public findById$(id:number): Observable<Project> {
    return this.http.get<Project>(`${this.configUrl}/${id}`);
  }

  public update$(project: Project): Observable<Project> {
    return this.http.put<Project>(`${this.configUrl}/${project?.id}`,project);
  }

  public delete$(project: Project): Observable<any> {
    return this.http.delete<void>(`${this.configUrl}/${project?.id}`);
  }

  public insert$(project: Project): Observable<Project> {
    return this.http.post<Project>(`${this.configUrl}`,project);
  }

}
