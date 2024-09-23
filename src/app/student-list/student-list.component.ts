import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Student } from '../student.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit{

  dataSource: Student[] = [];
  displayedColumns: string[] = ['studentid', 'name', 'username', 'password', 'gender', 'department', 'update', 'delete'];

  constructor(private studentService : StudentService, private router: Router){

    this.getStudentList();
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


  updateStudent(studentid: number) : void{
     this.router.navigate(['/student', {studentid: studentid}]);
  }

  deleteStudent(studentid: number) : void{
    console.log(studentid);
    this.studentService.deleteStudent(studentid).subscribe(
      {
        next: (res) => {
          console.log(res);
          this.getStudentList();
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        }
      }
    );
  }

  getStudentList() : void{
    this.studentService.getStudents().subscribe(
      {
        next: (res: Student[]) => {
          this.dataSource = res;
        },
        error: (err:HttpErrorResponse) => {
          console.log(err);
        }
      }
    )
  }

  
}
