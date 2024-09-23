import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { StudentService } from "./student.service";
import { inject } from "@angular/core";
import { Observable, of } from "rxjs";
import { Student } from "./student.model";

export const StudentResolver: ResolveFn<any> = 
   (route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
           studentService: StudentService = inject(StudentService)) : Observable<Student> => {

            const studentid = route.paramMap.get("studentid");

            if(studentid){
                //make api call and get data for given studentid 
                return studentService.getStudent(Number(studentid));
            }
            else{
                //create and return empty employee details
                const student: Student = {
                    studentid: 0,
                    name: '',
                    username: '',
                    password: '',
                    gender: '',
                    department: ''
                  }

                  return of(student);
            }

           }