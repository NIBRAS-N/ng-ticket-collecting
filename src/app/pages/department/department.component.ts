import { Component, ElementRef, inject, NgModule, OnInit, ViewChild, viewChild } from '@angular/core';
import { FormsModule, NgControl } from '@angular/forms';
import { DepartmentService } from '../../core/services/department/department.service';
import { apiResponse, Department, Employee } from '../../core/models/api-model';
import { filter, map, Observable, TimeoutError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NaPipe } from "../../shared/pipes/na.pipe";
import { EmployeeService } from '../../core/services/employee/employee.service';
import { FilterPipe } from '../../shared/pipes/filter.pipe';
@Component({
    selector: 'app-department',
    standalone: true,
    templateUrl: './department.component.html',
    styleUrl: './department.component.css',
    imports: [FormsModule, CommonModule, NaPipe, FilterPipe ]
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

  paginatedItems:Department[]=[];
  currentPage = 1;
  itemsPerPage = 3;
  totalPages = 0;


  sortColumn: string = '';
  sortDirection: boolean = true;

  multipleForm:Department[] = [new Department()];

  constructor(){
    this.getAllEmployee()
  }
  
  async ngOnInit() {
    
    try {
      await this.loadDept()
      console.log("Department data loaded : " , this.alldept);
      this.totalPages = Math.ceil(this.alldept.length / this.itemsPerPage);
      this.updatePaginatedItems();
    } catch (error) {
      console.error('error loading department data ', error);
    }

    
  }
  


  updatePaginatedItems(){
    this.totalPages = Math.ceil(this.alldept.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedItems = this.alldept.slice(startIndex,endIndex);
  }
  goToPage(page:number){
    if(page>=1 && page <= this.totalPages){
      this.currentPage = page;
      this.updatePaginatedItems();
    }
  }
  nextPage(){
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedItems();
    }
  }
  prevPage(){
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedItems();
    }
  }
  getArray(length: number): number[] {
    return Array.from({ length }, (_, i) => i + 1);
  }

  addForm(idx:number){
    // this.formsSize++;  
    console.log(idx);
    this.multipleForm.splice(idx+1,0,new Department());
  }
  
  removeForm(idx:number){
    if(this.multipleForm.length == 1) return ;
    else {
      this.multipleForm.splice(idx,1);
    }
  //   if(this.formsSize === 1) return 
  //   else{
  //     this.formsSize--;
  //   }
  }
  onSubmit(form:any,idx:number){
    if(form.valid){
      console.log("index is : ", idx ,"submitted form is ", this.multipleForm[idx])
    }
  }
  async loadDept():Promise<void>{
    // debugger;  
    return new Promise((resolve,reject)=>{
      
      this.deptService.getAllDept().pipe(map((res:apiResponse)=>res.data))
      .subscribe(
        (res)=>{
          this.alldept=res;
          // console.log(this.alldept);
          resolve();
        },
        (error)=>{
          console.log(error);
          reject(error);
        }
    
      );


    });
    // setTimeout(() => {
    //   console.log(this.resp)
    // }, 1000);
    // console.log(this.selectedDepartment)
  }
  getAllEmployee(){
    this.resp$  = this.empService.getAllEmployee().pipe(map((res:apiResponse)=>{this.empArray=res.data;return res.data}))
  }
  newDept(idx:number){
    // console.log("no ", this.DepartmentObj.deptHeadEmpId , "  yes " , this.DepartmentObj.deptName)
    console.log("no ", this.multipleForm[idx].deptHeadEmpId , "  yes " , this.multipleForm[idx].deptName)
    console.log("no,yes",this.multipleForm[idx].deptHeadName);
    const lastIdx = this.alldept.length -1;
    
  
    if((this.multipleForm[idx].deptName ) && (this.multipleForm[idx].deptHeadEmpId) ){
      // debugger;
      this.deptService.CreateDept(this.multipleForm[idx]).subscribe(res=>{
        if(res.result){
          alert("Department Created successfully" + res.message);
          
          this.alldept.push(
            {
      
              deptId:this.alldept[lastIdx].deptId+1,
              deptName: this.multipleForm[idx].deptName,
              deptHeadEmpId: this.multipleForm[idx].deptHeadEmpId,
              createdDate: new Date(),
              deptHeadName: this.multipleForm[idx].deptHeadName
            }
          )
          this.updatePaginatedItems()
          this.goToPage(this.totalPages)
          this.clearField(idx)
          if(this.multipleForm.length!=1){

              setTimeout(() => {
                this.multipleForm.splice(idx,1);
              }, 1000);
          }
          // this.ngOnInit()
          // this.loadDept();
        }else{
          alert("Somethin wrong " + res.message);
        }
      })
    }
    else{
      // console.log(this.DepartmentObj);
      this.multipleForm[idx] = new Department();
      alert("field empty , cant call the api")
    }
  }

  clearField(idx:number){
    this.multipleForm[idx] = new Department();
    // this.abc.nativeElement.value = ""
    console.log(this.DepartmentObj);
  }

  onEdit(item:Department){
    // this.multipleForm.push(new Department());
    this.multipleForm.splice(0,0,new Department());
    this.multipleForm[0] = item ;
  }
  updateDept(idx:number){
    // console.log(this.DepartmentObj);
    this.deptService.updateDept(this.multipleForm[idx]).subscribe((res)=>{
      if(res.result){
        alert("Department updated successfully" + res.message);
        this.multipleForm[idx] = new Department();
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

  departmentHead(e:string,idx:number){
    // this.DepartmentObj.deptHeadName=e
    console.log(e,typeof e)
    // const tgt = e.target as HTMLSelectElement;
    // console.log(tgt)
    // const selectedEmployeeId:number = +target.value ;
    // console.log(selectedEmployeeId)
    const selectedEmployee = this.empArray.find((res)=>res.employeeId === +e) as Employee
    console.log(selectedEmployee);
    // if(selectedEmployee){
      this.multipleForm[idx].deptHeadName = selectedEmployee.employeeName;
      
    // }
  }


  sortTable(column: keyof Department ) {
      if (this.sortColumn === column) {
        this.sortDirection = !this.sortDirection;
      } else {
        this.sortColumn = column;
        this.sortDirection = true;
      }

      this.paginatedItems.sort((a, b) => {
        const aValue = a[column];
        const bValue = b[column];

        if (aValue < bValue) {
          return this.sortDirection ? -1 : 1;
        } else if (aValue > bValue) {
          return this.sortDirection ? 1 : -1;
        } else {
          return 0;
        }
      });
    }
}
