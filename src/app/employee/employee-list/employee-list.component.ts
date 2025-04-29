import { Component, OnInit } from '@angular/core';
import { Employee, EmployeeService } from '../../service/EmployeeService';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  imports: [RouterModule,CommonModule],
  styleUrl:'./employee-list.component.css'
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];

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
  
}
