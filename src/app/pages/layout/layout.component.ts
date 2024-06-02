import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { Employee } from '../../core/models/api-model';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule,RouterOutlet,CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  loggedData : Employee = new Employee();
  router :Router = inject(Router)
  constructor(){
    const localData = localStorage.getItem('ticketData');
    if(localData!= null){
      this.loggedData = JSON.parse(localData);
    }

  }
  onlogOut(){
    localStorage.removeItem('ticketData')
    this.router.navigateByUrl('/login')
  }
}
