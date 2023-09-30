import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Employee } from './employee';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeRegistrationService {
  // _url = "http://localhost:3000/register";
  _url = "https://kanbanfire-27682-default-rtdb.firebaseio.com/employee.json";
  constructor(private _httpClient:HttpClient) { }

  registerEmployee(employee:Employee):Observable<Employee>{
    return this._httpClient.post<Employee>(this._url, employee).pipe(catchError(this.errorHandler));
  }

  errorHandler(error:HttpErrorResponse){
    return throwError(error);
  }
}
