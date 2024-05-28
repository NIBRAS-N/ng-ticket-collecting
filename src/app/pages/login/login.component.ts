import { Component, inject } from '@angular/core';
import { EmployeeService } from '../../core/services/employee/employee.service';
import { LoginModel } from '../../core/models/api-model';
import { FormsModule, NgForm } from '@angular/forms';
import { apiResponse } from '../../core/models/api-model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  employeeService : EmployeeService = inject(EmployeeService)
  router:Router = inject(Router)
  loginModel : LoginModel = new LoginModel();
  
  onSubmit(){
    // debugger;
    // try {
      //   const dt = await this.employeeService.getAllEmployee()
      //   console.log("lol",dt)
      // } catch (error) {
        //   console.log("error", error);
        // }
        
        // this.employeeService.getAllEmployee()
    this.employeeService.login(this.loginModel)
    .subscribe({
      next:(res:apiResponse)=>{
        console.log(res);
        if(res.result){
          alert(`login done by ${this.loginModel.emailId}`);
          localStorage.setItem("ticketData",JSON.stringify(res.data))
          this.router.navigateByUrl('/dashboard');
        }else{
          alert("login failed "+ `${res.message}` )
          this.router.navigateByUrl('/dashboard');
        }
      },
      error:(res)=>{

        console.log("form error ",res);
        
      }
      
    });
  }
}
