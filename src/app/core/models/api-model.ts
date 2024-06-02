export interface apiResponse {
    message: string,
    result: boolean,
    data: any
}


export class Department {
    deptId: number
    deptName: string
    deptHeadEmpId: number
    createdDate: Date
    deptHeadName:string
    constructor(){
        this.deptId=0;
        this.deptName="",
        this.deptHeadEmpId=0,
        this.createdDate= new Date();
        this.deptHeadName=""
    }
}
export class Employee {
    employeeId: number 
    employeeName: string
    deptId: number
    deptName: string
    contactNo: string
    emailId: string 
    role:string  
    gender:string
    password:string=""
    constructor(){
        this.employeeId=0;
        this.employeeName="",
        this.deptId=0,
        this.deptName="",
        this.contactNo="",
        this.emailId= ""
        this.role="Admin Department Employee"
        this.gender=""
    }
}

export class LoginModel{
    emailId: string
    password : string

    constructor(){
        this.emailId = "",
        this.password = ""
    }
}

export class TicketList{
    ticketId: number;
    ticketNo:string;
    employeeId:number;
    createdDate: Date
    expectedEndDate: Date
    state: string
    severity: string
    contactNo: string
    deptName: string
    createdByEmployee: string
    assignedToEmployee: string
    completedDate: any
    

    constructor()
    {
        this.employeeId=0;
        this.ticketId = 0;
        this.deptName = ""
        this.createdDate = new Date();
        this.expectedEndDate =  new Date()
        this.state = ""
        this.severity=""
        this.contactNo=""
        this.ticketNo=""
        this.deptName=""
        this.createdByEmployee=""
        this.assignedToEmployee=""
        this.completedDate = null
    }
}

export class TicketModel{
    employeeId:number=0;
    severity:string = "";
    deptId:number=0;
    state:string = "Un-assigned";
    requestDetails:string = ""


}