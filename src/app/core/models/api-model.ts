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
    constructor(){
        this.deptId=0;
        this.deptName="",
        this.deptHeadEmpId=0,
        this.createdDate= new Date();
    }
}

export class Login{
    emailId: string
    password : string

    constructor(){
        this.emailId = "",
        this.password = ""
    }
}