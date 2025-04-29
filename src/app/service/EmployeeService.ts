import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {

    constructor(private http: HttpClient) { }
    private baseUrl = 'http://localhost:8080/api/employee';

    getAll(): Observable<any> {
        return this.http.get(this.baseUrl + "/get")
    }

    addEmployee(employee: Employee): Observable<Employee> {
        return this.http.post<Employee>(this.baseUrl + "/save-employee/", employee);
    }

    deleteEmployee(id: number): Observable<any> {
        return this.http.delete(this.baseUrl + "/delete/" + id)
    }
    searchEmployee(id: number): Observable<any> {
        return this.http.get(this.baseUrl + "/search/" + id)
    }
    searchEmployeeByName(name: string): Observable<any>{
        return this.http.get(this.baseUrl + "/search-by-name/" +name)
    }
    searchEmployeeByEmail(email: string): Observable<any>{
        return this.http.get(this.baseUrl + "/search-by-email/" +email)
    }


}

export interface Employee {
    id?: number;
    name: string;
    email: string;
    department: string;
}   