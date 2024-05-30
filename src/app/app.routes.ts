import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EmployeeComponent } from './pages/employee/employee.component';
import { DepartmentComponent } from './pages/department/department.component';
import { TicketsComponent } from './pages/tickets/tickets.component';
import { NewTicketComponent } from './pages/new-ticket/new-ticket.component';

export const routes: Routes = [
    {
        path:"",
        redirectTo:"login",
        pathMatch:"full"
    },
    {
        path:"login",
        component:LoginComponent,

    },
    {
        path:'',
        component:LayoutComponent,
        children:[
            {
                path:"dashboard",
                component:DashboardComponent
            },
            {
                path:"employee",
                component:EmployeeComponent
            },
            {
                path:"department",
                // loadChildren:()=>import('./pages/pages.module').then(m=>m.PagesModule)
                component:DepartmentComponent
            },
            {
                path:"tickets",
                component:TicketsComponent
            },
            {
                path:"new-tickets",
                component:NewTicketComponent
            },
          
        ]
    }
];
