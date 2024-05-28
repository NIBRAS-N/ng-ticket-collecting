import { Component, inject, OnInit } from '@angular/core';
import { EmployeeService } from '../../core/services/employee/employee.service';
import { apiResponse } from '../../core/models/api-model';
import { Observable, throwError } from 'rxjs';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {
  empService : EmployeeService = inject(EmployeeService);
  response!: Observable<apiResponse>;
  employeeList!:apiResponse;
  ngOnInit(): void {
    this.response = this.empService.getAllEmployee()
    
    this.response.subscribe({
      next:(res)=>{this.employeeList=res},
      error:(err)=> throwError(()=>err)
    });
    setTimeout(() => {
      console.log(this.employeeList);
      
    }, 1000);
  }
}
