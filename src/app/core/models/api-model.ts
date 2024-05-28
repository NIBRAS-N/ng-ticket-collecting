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
    employeeId: string
    employeeName: string
    deptId: string
    deptName: string
    contactNo: string
    emailId: string 
    role:string  
    constructor(){
        this.employeeId="";
        this.employeeName="",
        this.deptId="",
        this.deptName="",
        this.contactNo="",
        this.emailId= ""
        this.role="Admin Department Employee"
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

export class Task{
    constructor(
        public title: string="", 
        public desc: string="",
        public assignedTo: string="",
        public createdAt: string="",
        public priority: string="",
        public status: string="",
        public id?: string  
    )
    {

    }
}