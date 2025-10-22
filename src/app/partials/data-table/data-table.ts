import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatTableModule, MatCellDef } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { Course } from '../../model/course';
import { ServiceCoursedata } from '../../services/coursedata/service-coursedata';
import { ServiceRamschema } from '../../services/ramschema/service-ramschema';



@Component({
  selector: 'app-data-table',
  imports: [CommonModule, MatTableModule, MatCellDef, MatInputModule, MatSortModule, MatFormFieldModule, MatButtonModule, MatSelectModule, FormsModule],
  templateUrl: './data-table.html',
  styleUrl: './data-table.css'
})

export class DataTable implements OnInit, AfterViewInit {

  //properties & interface
  courses: Course[] = [];
  displayedColumns: string[] = ["courseCode", "courseName", "points", "subject", "actions"];
  dataSource = new MatTableDataSource<Course>([]);
  selectedValue: string = "";

  //inleder sorteringen
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  //konstruktorn
  constructor(
    private ServiceCoursedata: ServiceCoursedata,
    private ServiceRamschema: ServiceRamschema
  ) {}

  //när sidan laddas in
  ngOnInit(): void {
    
    this.ServiceCoursedata.getCourses().subscribe((courses) => {
      
      this.courses = courses;
      this.dataSource.data = this.courses;
    });
  }

  //lägg till kurs till ramschemat
  addCourseToMyTable(course: Course) {
    //hämtar nuvarande kurser
    const currentCourses = this.ServiceRamschema.getCourses();

    //finns kursen redan?
    const courseExists = currentCourses.some((existingCourse) => {
      existingCourse.courseCode === course.courseCode;
    });

    //meddelanden till användaren
    if (courseExists) {
      alert("Kursen är redan tillagd. Du kan inte lägga till den igen-");
    } else {
      this.ServiceRamschema.addCourse(course);
      console.log("Kurs tillagd");
    }
  }


  //filtrerar datan
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    this.dataSource.filterPredicate = (data: Course, filter: string) => {
      
      const searchInput = filter.split(' ');

      return searchInput.every(term =>
        data.courseCode.toLowerCase().includes(term) ||
        data.courseName.toLowerCase().includes(term) ||
        data.subject.toLowerCase().includes(term)
      );
    };
  }

  //sorteringen
  sortCourses(direction: "desc") {
    this.displayedColumns.forEach(column => {
      this.sort.sort({id: column, start: direction, disableClear: true});
    });
  };
}
