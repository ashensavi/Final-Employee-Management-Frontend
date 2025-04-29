import { Component, OnInit } from '@angular/core';
import { Employee, EmployeeService } from '../../service/EmployeeService';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import * as XLSX from 'xlsx';  

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  imports: [RouterModule,CommonModule,NgxPaginationModule],
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  p: number = 1; 
  itemsPerPage: number = 5;
  isDeleteConfirmationVisible = false;
  selectedEmployee: any;

  constructor(private employeeService: EmployeeService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getAll().subscribe(data => this.employees = data);
  }

  delete(id: number): void {
    this.employeeService.deleteEmployee(id).subscribe(() => this.loadEmployees());
  }

  sort(key: keyof Employee): void {
    this.employees.sort((a, b) => a[key]! > b[key]! ? 1 : -1);
  }

  editEmployee(id: number): void {
    this.router.navigate(['edit', id]);
    console.log('Current URL:', this.router.url);
  }

  exportToExcel(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.employees); 
    const wb: XLSX.WorkBook = XLSX.utils.book_new(); 
    XLSX.utils.book_append_sheet(wb, ws, 'Employees');
    XLSX.writeFile(wb, 'Employee_Details.xlsx');
  }

  confirmDelete(employeeId: number): void {
    this.selectedEmployee = this.employees.find(emp => emp.id === employeeId);
    this.isDeleteConfirmationVisible = true;
  }

  deleteEmployee(): void {
    if (this.selectedEmployee) {
      this.employeeService.deleteEmployee(this.selectedEmployee.id).subscribe(() => {
        this.loadEmployees(); 
        this.closeModal(); 
      });
    }
  }

  closeModal(): void {
    this.isDeleteConfirmationVisible = false;
    this.selectedEmployee = null; 
  }
}
