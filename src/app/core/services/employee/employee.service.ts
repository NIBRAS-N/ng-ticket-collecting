import { inject, Injectable } from '@angular/core';
import { apiResponse, LoginModel, Task } from '../../models/api-model';
import { catchError, from, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { constant } from '../../constants/Constant';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  http : HttpClient = inject(HttpClient)
  constructor() { }

  login(data:LoginModel) : Observable<apiResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    });
    console.log(environment.API_URL + constant.API_ENDPOINT.LOGIN);
    return this.http.post<apiResponse>(environment.API_URL + constant.API_ENDPOINT.LOGIN , data , {headers:headers});
  }

  getAllEmployee():Observable<apiResponse>{
  // async getAllEmployee(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
    });
    // try {
      

    //   const response = await fetch(environment.API_URL + constant.API_ENDPOINT.GET_ALL_EMPLOYEE,
    //     {
          
    //       headers:{
    //         'Content-Type': 'application/json',
    //         'Access-Control-Allow-Origin': '*',
    //       },
    //       method:'GET',
          
    //     }
    //   )
    //   if (!response.ok) {
    //     throw new Error('Network response was not ok');
    //   }
    //   const data = await response.json();
    //   console.log("Resolved data:", response);
    //   return  data;
    // } catch (error) {
    //   throwError(()=>error)
    //   return 
    // }
   


    // console.log(environment.API_URL + constant.API_ENDPOINT.GET_ALL_EMPLOYEE);

    


    return this.http.get<apiResponse>(environment.API_URL + constant.API_ENDPOINT.GET_ALL_EMPLOYEE,{headers:headers}).pipe(map((res)=>{return res}))

    // return this.http.get<{[key:string]:Task}>("https://angularhttpclient-27d32-default-rtdb.firebaseio.com/tasks.json",{headers:headers})
    // .pipe(
    //   map((res)=>{
    //     console.log("hello ",res);
    //     const data = [];
    //     for(let i in res){
    //       console.log("form for ",i);
    //       data.push(res[i])
    //     }
    //     return {message:"data has come" , result: true , data};
    //   }),
    // catchError((err)=>{console.log("hello2 ",err);return throwError(()=>err)}))
    
  }
}
