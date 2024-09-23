import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from './student.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private httpClient: HttpClient) { }

  api = "http://localhost:8081"
  public saveStudent(student: Student): Observable<Student>{
    return this.httpClient.post<Student>(`${this.api}/save/student`, student);
  }

  public getStudents(): Observable<Student[]>{
    return this.httpClient.get<Student[]>(`${this.api}/get/student`);
  }

  public deleteStudent(studentid : number){
    return this.httpClient.delete(`${this.api}/delete/student/${studentid}`);
  }

  public getStudent(studentid: number){
    return this.httpClient.get<Student>(`${this.api}/get/student/${studentid}`);
  }

  public updateStudent(student: Student){

    return this.httpClient.put<Student>(`${this.api}/update/student`, student);
  }
}
