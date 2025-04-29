import { Component, OnInit } from '@angular/core';
import { Employee, EmployeeService } from '../../service/EmployeeService';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  imports: [BrowserModule,RouterModule
  ],
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];

  constructor(private employeeService: EmployeeService) {}

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
}
