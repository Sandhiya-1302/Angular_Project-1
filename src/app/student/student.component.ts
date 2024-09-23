import { Component, OnInit } from '@angular/core';
import { Student } from '../student.model';
import { NgForm } from '@angular/forms';
import { StudentService } from '../student.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
})
export class StudentComponent implements OnInit {
  isCreateStudent: boolean = true;
  student: any;
  

  constructor(
    private studentService: StudentService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.student = this.activatedRoute.snapshot.data['student'];
    console.log(this.student);

    if (this.student && this.student.studentid > 0) {
      this.isCreateStudent = false;
    } else {
      this.isCreateStudent = true;
    }
  }

  saveStudent(studentForm: NgForm): void {
    if (this.isCreateStudent) {
      this.studentService.saveStudent(this.student).subscribe({
        next: (res: Student) => {
          console.log(res);
          studentForm.reset();
          alert('Registered Successfully!');
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        },
      });
    } else {
      this.studentService.updateStudent(this.student).subscribe({
        next: (res: Student) => {
          this.router.navigate(['/student-list']);
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        },
      });
    }
  }

  checkGender(gender: string) {
    return this.student.gender != null && this.student.gender == gender;
  }

  selectGender(gender: string) {
    this.student.gender = gender;
  }
}
