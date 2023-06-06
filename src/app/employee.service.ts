import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeeModel } from './employee-model';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  private baseURL = "http://localhost:8080";

  constructor(private httpClient: HttpClient) { }

  getEmployees(): Observable<EmployeeModel[]> {
    return this.httpClient.get<EmployeeModel[]>(this.baseURL + '/employees');
  }

  getEmployeeById(id: number): Observable<EmployeeModel>{
    return this.httpClient.get<EmployeeModel>(this.baseURL +'/employee/'+id);
  }

  createEmployee(employee: EmployeeModel): Observable<Object> {
    return this.httpClient.post(`${this.baseURL}/create`, employee);
  }

  updateEmployee(id: number,employee: EmployeeModel): Observable<Object> {
    return this.httpClient.put(`${this.baseURL}/employee/${id}`, employee);
  }

  deleteEmployee(id:number) {
    return this.httpClient.delete<any>(`${this.baseURL}/employee/${id}`);
  }

  searchEmployee(searchItem:Object): Observable<EmployeeModel[]> {
    return this.httpClient.post<EmployeeModel[]>(this.baseURL + '/search', searchItem);
  }

  showLoading() {
    return Swal.fire({
    title: 'Loading ...',
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
    }
  })
  }



}
