import { Component, ElementRef, inject, OnInit, ViewChild, viewChild } from '@angular/core';
import { DepartmentService } from '../../core/services/department/department.service';
import { apiResponse, Department, TicketList, TicketModel } from '../../core/models/api-model';
import { map, Observable, TimeoutError, timeoutWith } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../core/services/employee/employee.service';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.css'
})
export class TicketsComponent implements OnInit {
  @ViewChild('ticketModel') popModel: ElementRef<HTMLInputElement>  | undefined;
  deptService:DepartmentService = inject(DepartmentService);
  departmentList$: Observable<Department[]> | undefined
  ticketObj:TicketModel = new TicketModel();
  empService:EmployeeService = inject(EmployeeService)
  ticketList:TicketList[]=[];
  loggedData!:any;
  constructor(){
    const localdata = localStorage.getItem('ticketData')
    const loc = JSON.parse(localdata!);
    this.loggedData = loc;
    const empId = loc.employeeId;
    this.ticketObj.employeeId=empId;
  }

  ngOnInit(){
    
    // console.log("hello" , this.ticketObj.employeeId)
    // console.log("hello" , this.ticketObj)
    if(this.loggedData.role == "Department Head" ){
      // this.getUnAssignedTickets();
      this.getTickets(this.ticketObj.employeeId);
    }else if(this.loggedData.role == "Employee"){

      this.getTickets(this.ticketObj.employeeId);
    }
  }

  getUnAssignedTickets(){
    this.empService.getAllTicketsByHead(this.loggedData.employeeId).subscribe((res)=>{this.ticketList = res.data});
  }
  getTickets(id:number){
    this.empService.getTicketesByEMpId(id).subscribe((res)=>{this.ticketList = res.data;console.log(res.data)})
    
    setTimeout(() => {
      console.log(this.ticketList)
    }, 1000);
  }
  public openTicketModel(){
    if(this.popModel!=null)
      this.popModel.nativeElement.style.display = 'block'

    this.loadDept()
  }
  public closeTicketModel(){
    if(this.popModel!=null)
      this.popModel.nativeElement.style.display="none"
    this.ngOnInit()
  }
  loadDept(){
    // debugger;  
    this.departmentList$ = this.deptService.getAllDept().pipe(map((src:apiResponse)=>src.data));
    
  }
  onCreateTicekt(){
  
    console.log(this.ticketObj)
    this.empService.createTicket(this.ticketObj).subscribe((res:apiResponse)=>{
      if(res.result){
        alert("Ticket created successfully")
      }else{
        alert("ticket not created ")  
      }
    });
    // this.getTickets(this.ticketObj.employeeId)
  }
}
