import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  addEmployee(data: any) : Observable<any>
  {
    //This service will return observable
    return this.http.post('http://localhost:3000/employees', data);
  }

  //Adding one more service to get list of all the employees stored in db.json entered on UI.
  getEmployeeList() : Observable<any>
  {
    return this.http.get('http://localhost:3000/employees');
  }

  deleteEmployee(id: number) : Observable<any>{
      return this.http.delete(`http://localhost:3000/employees/${id}`);
  }

  updateEmployee(id: number, data:any): Observable<any>{
    return this.http.put(`http://localhost:3000/employees/${id}`, data);
  }
}
