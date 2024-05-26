import { inject, Injectable } from '@angular/core';
import { apiResponse, Login } from '../../models/api-model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { constant } from '../../constants/Constant';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  http : HttpClient = inject(HttpClient)
  constructor() { }

  login(data:Login) : Observable<apiResponse> {
    return this.http.post<apiResponse>(environment.API_URL + constant.API_ENDPOINT.LOGIN,data);
  }
}
