import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { constant } from '../../constants/Constant';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { apiResponse, Department } from '../../models/api-model';
@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  http: HttpClient = inject(HttpClient)
  constructor() { }

  getAllDept() : Observable<apiResponse> {
    return this.http.get<apiResponse>(environment.API_URL + constant.API_ENDPOINT.GET_DEPARTMENT);
  }
  CreateDept(data:Department) : Observable<apiResponse> {
    return this.http.post<apiResponse>(environment.API_URL + constant.API_ENDPOINT.CREATE_DEPARTMENT,data);
  }
  updateDept(data:Department) : Observable<apiResponse> {
    return this.http.put<apiResponse>(environment.API_URL + constant.API_ENDPOINT.UPDATE_DEPARTMENT,data);
  }
  DeleteDept(id:number) : Observable<apiResponse> {
    return this.http.delete<apiResponse>(environment.API_URL + constant.API_ENDPOINT.DELETE_DEPARTMENT+id);
  }

}
