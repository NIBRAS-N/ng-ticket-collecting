import { Component, ElementRef, inject, NgModule, OnInit, ViewChild, viewChild } from '@angular/core';
import { FormsModule, NgControl } from '@angular/forms';
import { DepartmentService } from '../../core/services/department/department.service';
import { apiResponse, Department, Employee } from '../../core/models/api-model';
import { filter, map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NaPipe } from "../../shared/pipes/na.pipe";
import { EmployeeService } from '../../core/services/employee/employee.service';
import { FilterPipe } from '../../shared/pipes/filter.pipe';
@Component({
    selector: 'app-department',
    standalone: true,
    templateUrl: './department.component.html',
    styleUrl: './department.component.css',
    imports: [FormsModule, CommonModule, NaPipe, FilterPipe]
})
export class DepartmentComponent implements OnInit   {
  deptService:DepartmentService = inject(DepartmentService);
  empService:EmployeeService = inject(EmployeeService);
  resp$!:Observable<Employee[]>
  alldept:Department[]=[]
  empArray:Employee[] =[] 

  DepartmentObj: Department=new Department();

  @ViewChild('selected')abc!:ElementRef;
  searchText:any;

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
    this.resp$  = this.empService.getAllEmployee().pipe(map((res:apiResponse)=>{this.empArray=res.data;return res.data}))
  }
  newDept(){
    console.log("no ", this.DepartmentObj.deptHeadEmpId , "  yes " , this.DepartmentObj.deptName)
    const lastIdx = this.alldept.length -1;
    this.alldept.push(
      {

        deptId:this.alldept[lastIdx].deptId+1,
        deptName: this.DepartmentObj.deptName,
        deptHeadEmpId: this.DepartmentObj.deptHeadEmpId,
        createdDate: new Date(),
        deptHeadName: this.DepartmentObj.deptHeadName
      }
    )
    if((this.DepartmentObj.deptName ) && (this.DepartmentObj.deptHeadEmpId) ){
      // debugger;
      this.deptService.CreateDept(this.DepartmentObj).subscribe(res=>{
        if(res.result){
          alert("Department Created successfully" + res.message);
          this.DepartmentObj = new Department();
          // this.ngOnInit()
          // this.loadDept();
        }else{
          alert("Somethin wrong " + res.message);
        }
      })
    }
    else{
      console.log(this.DepartmentObj);
      this.DepartmentObj = new Department();
      alert("field empty , cant call the api")
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
        // this.ngOnInit()
        this.loadDept();
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
          // this.ngOnInit();
          this.loadDept();
        }else{
          alert("department not deleted "+ rs.message)
        }
      })
    }
  }

  departmentHead(e:string){
    // this.DepartmentObj.deptHeadName=e
    console.log(e,typeof e)
    // const tgt = e.target as HTMLSelectElement;
    // console.log(tgt)
    // const selectedEmployeeId:number = +target.value ;
    // console.log(selectedEmployeeId)
    const selectedEmployee = this.empArray.find((res)=>res.employeeId === +e) as Employee
    console.log(selectedEmployee);
    // if(selectedEmployee){
      this.DepartmentObj.deptHeadName = selectedEmployee.employeeName;
      
    // }
  }
}
