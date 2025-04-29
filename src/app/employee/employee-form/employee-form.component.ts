import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../service/EmployeeService';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  templateUrl: './employee-form.component.html',
  styleUrl:'./employee-form.component.css',
  imports: [CommonModule, ReactiveFormsModule]
})
export class EmployeeFormComponent implements OnInit {
  form: FormGroup;
  id?: number;
  employee: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      department: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id');
    this.id = param ? +param : undefined;
    if (this.id) {
      this.employeeService.searchEmployee(this.id).subscribe(emp => {
        this.employee = emp;
        this.form.patchValue(emp);
      });
    }
  }

  onSubmit(): void {
    const formData = this.form.value;
    const action = this.id
      ? this.employeeService.addEmployee({ id: this.id, ...formData })
      : this.employeeService.addEmployee(formData);

    action.subscribe(() => {
      this.router.navigate(['/employees']);
    });
  }

  cancel(): void {
    this.router.navigate(['/employees']);
  }
}
