import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../service/EmployeeService';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  imports:[CommonModule,ReactiveFormsModule]
})
export class EmployeeFormComponent implements OnInit {
  form: FormGroup;
  id?: number;

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
    this.id = +this.route.snapshot.paramMap.get('id')!;
    if (this.id) {
      this.employeeService.searchEmployee(this.id).subscribe(emp => this.form.patchValue(emp));
    }
  }

  onSubmit(): void {
    if (this.id) {
      this.employeeService.addEmployee({ id: this.id, ...this.form.value }).subscribe(() => this.router.navigate(['/']));
    } else {
      this.employeeService.addEmployee(this.form.value).subscribe(() => this.router.navigate(['/']));
    }
  }

  cancel(): void {
    this.router.navigate(['/']);
  }
}

