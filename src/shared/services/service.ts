import {Observable} from "rxjs";

export interface Service {
  findById$(id:number): Observable<any>;
  findAll$(): Observable<any>;
  update$(object: any): Observable<any>;
  insert$(object: any): Observable<any>;
  delete$(object: any): Observable<any>;
}
