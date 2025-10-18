import { Injectable } from '@angular/core';
import { Course } from '../../model/course';

@Injectable({
  providedIn: 'root'
})

export class ServiceRamschema {
  private readonly STORAGE_KEY = "ramschema_courses"

  //lägg till kurs i tabellen från service-coursedata & show-courses

  //validerar om kursen redan finns != kan inte lägga till kursen

  //spara till localStorage
  saveCourses(courses: Course[]):void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(courses));
  }

  //hämta från localStorage
  getCourses(): Course[] {
      const courses = localStorage.getItem(this.STORAGE_KEY);

      return courses ? JSON.parse(courses): [];
    }
  
  //lägg till kurs i localStorage
  addCourse(course: Course): void {
    const courses = this.getCourses();

    //validering
    if(!courses.some(c => c.courseCode === course.courseCode)) {
      courses.push(course);
      this.saveCourses(courses);
    }
  }

  //ta bort kurs från localStorage
  removeCourse(courseCode: string): void {
    let courses = this.getCourses();
    courses = courses.filter(course => course.courseCode !== courseCode);
    this.saveCourses(courses);
  }

}
