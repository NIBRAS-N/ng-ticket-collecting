import { Component, inject, OnInit } from '@angular/core';
import { EmployeeService } from '../../core/services/employee/employee.service';
import { apiResponse, Department, Employee } from '../../core/models/api-model';
import { map, Observable, throwError } from 'rxjs';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DepartmentService } from '../../core/services/department/department.service';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {

  // fetched data from empService with 1st way, 
  //fetched data from deptService with 2nd way

  empService : EmployeeService = inject(EmployeeService);
  deptService : DepartmentService = inject(DepartmentService);
  response!: Observable<apiResponse>;
  employeeList!:apiResponse;
  oneEmployee:Employee=new Employee;
  allEmployee! : Employee[];
  departmentList$: Observable<Department[]> | undefined
  employeeObj :Employee = new Employee();


  showAddEMpButton:boolean  = false;
  maleRadio:boolean = false;
  femaleRadio:boolean =false;
  ngOnInit(): void {
    this.laodEmployee()
   
    this.loadDept()

    setTimeout(() => {
      // this.empService.getEmployeeById(this.employeeList.data[0].employeeId).subscribe((res:apiResponse)=>this.oneEmployee=res.data);
      // setTimeout(() => {
      //   console.log(this.oneEmployee);
      // }, 1000);
      console.log(this.allEmployee);
      
      
    }, 1000);
  }
  laodEmployee(){
    this.response = this.empService.getAllEmployee()
    
    this.response.subscribe({
      next:(res:apiResponse)=>{this.allEmployee=res.data},
      error:(err)=> throwError(()=>err)
    });


  }

  loadDept(){
    this.departmentList$ = this.deptService.getAllDept().pipe(map((src:apiResponse)=>src.data));
  }
  addEmpForm(){
    this.showAddEMpButton = !this.showAddEMpButton;
  }
  saveEmployee(){
    console.log(this.employeeObj);
    this.empService.addEmployee(this.employeeObj).subscribe({

      next:(res:apiResponse)=>{
        console.log(res);
        if(res.result){
          alert("Employee Created Successfully")
          this.laodEmployee()
        }
        else{
          alert("hello"+res.message)
        }
      },
      error:(res)=>{
        console.log(res);
        throwError(()=>res)
      }
    }
  
    );
  }

  onReset(){
    
    this.employeeObj = new Employee()
  }
  
}
