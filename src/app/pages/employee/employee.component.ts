import { Component, inject, OnInit } from '@angular/core';
import { EmployeeService } from '../../core/services/employee/employee.service';
import { apiResponse, Employee } from '../../core/models/api-model';
import { Observable, throwError } from 'rxjs';
import { NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {
  empService : EmployeeService = inject(EmployeeService);
  response!: Observable<apiResponse>;
  employeeList!:apiResponse;
  oneEmployee:Employee=new Employee;
  allEmployee! : Employee[];
  
  ngOnInit(): void {
    this.response = this.empService.getAllEmployee()
    
    this.response.subscribe({
      next:(res:apiResponse)=>{this.allEmployee=res.data},
      error:(err)=> throwError(()=>err)
    });
    setTimeout(() => {
      // this.empService.getEmployeeById(this.employeeList.data[0].employeeId).subscribe((res:apiResponse)=>this.oneEmployee=res.data);
      // setTimeout(() => {
      //   console.log(this.oneEmployee);
      // }, 1000);
      console.log(this.allEmployee);
      
    }, 1000);
  }
}
