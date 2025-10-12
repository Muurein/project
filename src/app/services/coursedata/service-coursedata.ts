import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ServiceCoursedata {
  title = "example";
  Courses: any;
  const url: ["/public/miun_courses.json"];
  // url: string = "public/miu"

  // constructor(private http: HttpClient) {

  // } 

  // //hämta kurser
  // getCourses(): Observable<Course[]> {
  //   return this.http.get<Course[]>(this.url);
  // }
}
