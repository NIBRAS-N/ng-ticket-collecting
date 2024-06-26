import { inject, Injectable } from '@angular/core';
import { apiResponse, Employee, LoginModel, TicketModel } from '../../models/api-model';
import { catchError, from, Observable, tap, throwError } from 'rxjs';
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
    return this.http.post<apiResponse>(environment.API_URL + constant.API_ENDPOINT.LOGIN , data , {headers});
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

  getEmployeeById(id:number):Observable<apiResponse>{
    return this.http.get<apiResponse>(environment.API_URL + constant.API_ENDPOINT.GET_EMPLOYEE_BY_ID+'?id='+id)
    .pipe(tap(res=>res));
  }

  addEmployee(obj:Employee):Observable<apiResponse>{
    return this.http.post<apiResponse>(environment.API_URL + constant.API_ENDPOINT.CREATE_EMPLOYEE,obj).pipe(tap(res=>res));
  }


  createTicket(Obj:TicketModel){
    return this.http.post<apiResponse>(environment.API_URL + constant.API_ENDPOINT.NEW_TICKET,Obj)
  }

  getTicketesByEMpId(id:number){
    console.log(id,typeof id)
    return this.http.get<apiResponse>(environment.API_URL + constant.API_ENDPOINT.TICKET_BY_EMPLOYEE+id)
  }

  getAllTicketsByHead(id:number){
    console.log(id,typeof id)
    return this.http.get<apiResponse>(environment.API_URL + constant.API_ENDPOINT.AlL_TICKETS_BY_HEAD+id);
  }
  
}
