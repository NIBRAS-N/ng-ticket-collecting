import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { DeparmentColumnEnum } from '../../core/enum/department-coloumn.enum';
import { apiResponse, Department, Employee } from '../../core/models/api-model';
import { DepartmentService } from '../../core/services/department/department.service';
import { EmployeeService } from '../../core/services/employee/employee.service';
import { FilterPipe } from '../../shared/pipes/filter.pipe';
import { NaPipe } from '../../shared/pipes/na.pipe';
@Component({
  selector: 'app-department',
  standalone: true,
  templateUrl: './department.component.html',
  styleUrl: './department.component.css',
  imports: [FormsModule, CommonModule, NaPipe, FilterPipe],
})
export class DepartmentComponent implements OnInit {
  DeparmentColumnEnum = DeparmentColumnEnum;
  // deptService:DepartmentService = inject(DepartmentService);
  // empService:EmployeeService = inject(EmployeeService);
  resp$!: Observable<Employee[]>;
  alldept: Department[] = [];
  empArray: Employee[] = [];
  empNameArray: string[] = [];

  DepartmentObj: Department = new Department();

  @ViewChild('selected') abc!: ElementRef;
  searchText: any;

  paginatedItems: Department[] = [];
  currentPage = 1;
  itemsPerPage = 3;
  totalPages = 0;

  sortColumn: string = '';
  sortDirection: boolean = true;

  multipleForm: Department[] = [new Department()];
  editMode: boolean = false;
  isLoading: boolean = false;

  constructor(
    private readonly deptService: DepartmentService,
    private readonly empService: EmployeeService
  ) {
    this.getAllEmployee();
  }

  async ngOnInit() {
    // this.loadDept();
    // console.log('Department data loaded : ', this.alldept);
    //   this.totalPages = Math.ceil(this.alldept.length / this.itemsPerPage);
    // setTimeout(() => {

    //   this.updatePaginatedItems();
    // }, 1000);

    try {
      await this.loadDept();
      console.log('Department data loaded : ', this.alldept);
      this.totalPages = Math.ceil(this.alldept.length / this.itemsPerPage);
      this.updatePaginatedItems();
    } catch (error) {
      console.error('error loading department data ', error);
    }
  }

  updatePaginatedItems() {
    this.totalPages = Math.ceil(this.alldept.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedItems = this.alldept.slice(startIndex, endIndex);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedItems();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedItems();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedItems();
    }
  }
  getArray(length: number): number[] {
    return Array.from({ length }, (_, i) => i + 1);
  }

  addForm(idx: number) {
    // this.formsSize++;
    // console.log(idx);
    this.multipleForm.splice(idx + 1, 0, new Department());
  }

  removeForm(idx: number) {
    if (this.multipleForm.length == 1) return;

    this.multipleForm.splice(idx, 1);
  }

  onSubmit(form: any, idx: number) {
    if (form.valid) {
      console.log(
        'index is : ',
        idx,
        'submitted form is ',
        this.multipleForm[idx]
      );
    }
  }

  async loadDept(): Promise<void> {
    // debugger;
    return new Promise((resolve, reject) => {
      this.deptService
        .getAllDept()
        .pipe(map((res: apiResponse) => res.data))
        .subscribe({
          next: (res) => {
            this.alldept = res.map((dpt: Department, index: number) => ({
              ...dpt,
              slNo: index + 1,
            }));
            // console.log(this.alldept);
            resolve();
          },
          error: (error) => {
            console.log(error);
            reject(error);
          },
        });
    });
    // setTimeout(() => {
    //   console.log(this.resp)
    // }, 1000);
    // console.log(this.selectedDepartment)
  }
  // loadDept() {

  //     this.deptService
  //       .getAllDept()
  //       .pipe(map((res: apiResponse) => res))
  //       .subscribe(
  //         (res:apiResponse) => {
  //           this.alldept = res.data.map((dpt: Department, index: number) => ({
  //             ...dpt,
  //             slNo: index + 1,
  //           }));
  //           console.log(this.alldept);

  //         },
  //         (error) => {
  //           console.log(error);

  //         }
  //       );

  //   // setTimeout(() => {
  //   //   console.log(this.resp)
  //   // }, 1000);
  //   // console.log(this.selectedDepartment)
  // }

  getAllEmployee() {
    this.resp$ = this.empService.getAllEmployee().pipe(
      map((res: apiResponse) => {
        this.empArray = res.data;
        return res.data;
      })
    );
    this.resp$.subscribe({
      next: (res) => {
        this.empNameArray = res.map((item) => item.employeeName);
        console.log(this.empArray, ' ', this.empNameArray);
      },
      error: (error) => console.log(error),
    });
  }

  newDept() {
    // console.log("no ", this.DepartmentObj.deptHeadEmpId , "  yes " , this.DepartmentObj.deptName)
    // console.log(
    //   'no ',
    //   this.multipleForm[0].deptHeadEmpId,
    //   '  yes ',
    //   this.multipleForm[0].deptName
    // );

    console.log('no,yes', this.multipleForm[0].deptHeadName);
    // const lastIdx = this.alldept.length - 1;

    for (let i = 0; i < this.multipleForm.length; i++) {
      if (this.multipleForm[i].deptName && this.multipleForm[i].deptHeadEmpId) {
        continue;
      } else {
        alert(`Form no ${i} has missing data`);
        return;
      }
    }
    for (let i = 0; i < this.multipleForm.length; i++) {
      // debugger;
      this.deptService.CreateDept(this.multipleForm[i]).subscribe((res) => {
        if (res.result) {
          this.alldept.push(
            new Department({
              deptName: this.multipleForm[i].deptName,
              deptHeadEmpId: this.multipleForm[i].deptHeadEmpId,
              createdDate: new Date(),
              deptHeadName: this.multipleForm[i].deptHeadName,
              slNo: this.alldept.length + 1,
            })
          );
          this.updatePaginatedItems();
          this.goToPage(this.totalPages);
          this.clearField(i);
          if (this.multipleForm.length !== 1 && i != 0) {
            this.isLoading = true;
            setTimeout(() => {
              this.isLoading = false;
              this.multipleForm.splice(i, 1);
            }, 2000);
          }
          // this.ngOnInit()
          // this.loadDept();
        } else {
          alert('Somethin wrong ' + res.message);
        }
      });
    }
    alert(`${this.multipleForm.length} number of Department Created successfully`);
  }

  clearField(idx: number) {
    this.multipleForm[idx] = new Department();
    this.editMode = false;
    // this.abc.nativeElement.value = ""
    console.log(this.DepartmentObj);
  }

  onEdit(item: Department) {
    // this.multipleForm.push(new Department());
    this.multipleForm.splice(0, this.multipleForm.length);
    this.multipleForm.unshift(new Department());
    this.editMode = true;
    this.multipleForm[0] = item;
  }

  updateDept(idx: number) {
    // console.log(this.DepartmentObj);
    // console.log(this.multipleForm[idx])
    this.deptService.updateDept(this.multipleForm[idx]).subscribe((res) => {
      if (res.result) {
        alert('Department updated successfully' + res.message);

        this.alldept = this.alldept.map((item) => {
          if (item.deptHeadName === this.multipleForm[idx].deptHeadName) {
            return {
              ...item,
              deptHeadName: this.multipleForm[idx].deptHeadName,
              deptName: this.multipleForm[idx].deptName,
            };
          }
          return item;
        });
        this.multipleForm[idx] = new Department();
        // this.ngOnInit()
        // TODO: change here

        // this.loadDept();

        this.clearField(idx);
      } else {
        alert('Department not updated ' + res.message);
      }
    });
  }

  onDelete(id: any) {
    const res = confirm('You want to delete this?');
    if (res) {
      this.deptService.DeleteDept(id).subscribe((rs: apiResponse) => {
        if (rs.result) {
          alert('deleted successfully ' + rs.message);
          // this.ngOnInit();
          //TODO: change
          const idx = this.alldept.findIndex((item) => item.deptId === id);
          if (idx !== -1) this.alldept.splice(idx, 1);
          console.log(this.alldept);
          this.goToPage(this.currentPage);
          // this.loadDept();
        } else {
          alert('department not deleted ' + rs.message);
        }
      });
    }
  }

  departmentHead(e: string, idx: number) {
    // this.DepartmentObj.deptHeadName=e
    console.log(e, typeof e);
    // const tgt = e.target as HTMLSelectElement;
    // console.log(tgt)
    // const selectedEmployeeId:number = +target.value ;
    // console.log(selectedEmployeeId)
    const selectedEmployee = this.empArray.find(
      (res) => res.employeeId === +e
    ) as Employee;
    console.log(selectedEmployee);
    // if(selectedEmployee){
    this.multipleForm[idx].deptHeadName = selectedEmployee.employeeName;

    // }
  }

  sortTable(column: DeparmentColumnEnum) {
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
