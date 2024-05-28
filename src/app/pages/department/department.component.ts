import { Component, ElementRef, inject, NgModule, OnInit, ViewChild, viewChild } from '@angular/core';
import { FormsModule, NgControl } from '@angular/forms';
import { DepartmentService } from '../../core/services/department/department.service';
import { apiResponse, Department, Employee } from '../../core/models/api-model';
import { map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NaPipe } from "../../shared/pipes/na.pipe";
import { EmployeeService } from '../../core/services/employee/employee.service';

@Component({
    selector: 'app-department',
    standalone: true,
    templateUrl: './department.component.html',
    styleUrl: './department.component.css',
    imports: [FormsModule, CommonModule, NaPipe]
})
export class DepartmentComponent implements OnInit   {
  deptService:DepartmentService = inject(DepartmentService);
  empService:EmployeeService = inject(EmployeeService);
  resp$!:Observable<Employee[]>
  alldept:Department[]=[]
  
  DepartmentObj: Department=new Department();

  @ViewChild('selected')abc!:ElementRef;

  constructor(){
    this.getAllEmployee()
  }

  ngOnInit(): void {
    console.log("lol")
    this.loadDept()
    
  }
  loadDept(){
    // debugger;  
    
    this.deptService.getAllDept().pipe(map((res:apiResponse)=>res.data))
    .subscribe((res)=>{this.alldept=res;console.log(this.alldept)});
    // setTimeout(() => {
    //   console.log(this.resp)
    // }, 1000);
    // console.log(this.selectedDepartment)
  }
  getAllEmployee(){
    this.resp$  = this.empService.getAllEmployee().pipe(map((res:apiResponse)=>res.data))
  }
  newDept(){
    if(this.DepartmentObj.deptName != "" && this.DepartmentObj.deptName != undefined && this.DepartmentObj.deptHeadName !="" && this.DepartmentObj.deptHeadName != undefined ){

      this.deptService.CreateDept(this.DepartmentObj).subscribe(res=>{
        if(res.result){
          alert("Department Created successfully" + res.message);
          this.DepartmentObj = new Department();
          this.ngOnInit()
        }else{
          alert("Somethin wrong " + res.message);
        }
      })
    }
    else{
      this.DepartmentObj = new Department();
      alert("invalid credintails , cant call the api")
    }
  }

  clearField(){
    this.DepartmentObj = new Department();
    // this.abc.nativeElement.value = ""
    console.log(this.DepartmentObj);
  }

  onEdit(item:Department){
    this.DepartmentObj = item ;
  }
  updateDept(){
    console.log(this.DepartmentObj);
    this.deptService.updateDept(this.DepartmentObj).subscribe((res)=>{
      if(res.result){
        alert("Department updated successfully" + res.message);
        this.DepartmentObj = new Department();
        this.ngOnInit()
      }else{
        alert("Department not updated " + res.message);
      }

    })
  }

  onDelete(id:any){
    const res = confirm("You want to delete this?");
    if(res){
      this.deptService.DeleteDept(id).subscribe((rs:apiResponse)=>{
        if(rs.result){
          alert("deleted successfully "+ rs.message);
          this.ngOnInit();
        }else{
          alert("department not deleted "+ rs.message)
        }
      })
    }
  }
}
