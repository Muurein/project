import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Course } from "../../model/course";

@Injectable({
  providedIn: 'root'
})

export class ServiceCoursedata {

  private url: string = "miun_courses.json"; 

  constructor(private http: HttpClient) {

  };

  //hämta kurser
  getCourses(): Observable<Course[]> {

    return this.http.get<Course[]>(this.url);
  }


  // title = "example";
  // Courses: any;
  // const url = ["/public/miun_courses.json"];
  // // url: string = "public/miu"

  // // constructor(private http: HttpClient) {

  // // } 

  // // //hämta kurser
  // // getCourses(): Observable<Course[]> {
  // //   return this.http.get<Course[]>(this.url);
  // // }
}
