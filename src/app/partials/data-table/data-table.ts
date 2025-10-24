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
import { filter } from 'rxjs';



@Component({
  selector: 'app-data-table',
  imports: [CommonModule, MatTableModule, MatCellDef, MatInputModule, MatSortModule, MatFormFieldModule, MatButtonModule, MatSelectModule, FormsModule],
  templateUrl: './data-table.html',
  styleUrl: './data-table.css'
})

export class DataTable implements OnInit, AfterViewInit {

  //properties & interface
  courses: Course[] = [];
  categories: Course[] = [];
  displayedColumns: string[] = ["courseCode", "courseName", "points", "subject", "actions"];
  dataSource = new MatTableDataSource<Course>([]);
  selectedValue: string = "";
  searchString: string = "";
  categoryFilter: string = "";

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

      //fitlrerar bort dublettämnen i filtreringen
      this.categories = courses.filter((value, index, Array) =>
      index == Array.findIndex(course => course.subject == value.subject));
      

      this.dataSource.data = this.courses;
    });
  }

  //lägg till kurs till ramschemat
  addCourseToMyTable(course: Course): void {
  
    this.ServiceRamschema.addCourse(course);
    const currentCourses = this.ServiceRamschema.getCourses();
    const courseExists = currentCourses.some((existingCourse) => {
      existingCourse.courseCode === course.courseCode;
    });
  }


  //filtrerar datan
  applySearch(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchString = filterValue;
    // this.dataSource.filter = filterValue.trim().toLowerCase(); 

    // this.dataSource.filterPredicate = (data: Course, filter: string) => {
      
    //   const searchInput = filter.split(' ');

    //   return searchInput.every(term =>
    //     data.courseCode.toLowerCase().includes(term) ||
    //     data.courseName.toLowerCase().includes(term) ||
    //     data.subject.toLowerCase().includes(term)
    //   );
    // };
    this.applyFilter();
  }


  applyFilter() {
    //this.dataSource.filter = filterValue.trim().toLowerCase(); 
    //validering - tom sträng ska inte betyda att alal resutlat försvinner
    

    this.dataSource.filterPredicate = (data: Course, filter: string) => {
      
      const searchInput = filter.split(' ');

      return searchInput.every(term =>
        data.courseCode.toLowerCase().includes(term) ||
        data.courseName.toLowerCase().includes(term) ||
        data.subject.toLowerCase().includes(term)
      );
    };
  }


  applyCategory(event: Event)  {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    this.categoryFilter = filterValue;

    this.applyFilter();
  }

  //sorteringen
  sortCourses(direction: "desc") {
    this.displayedColumns.forEach(column => {
      this.sort.sort({id: column, start: direction, disableClear: true});
    });
  };

  //visar hur många kurser som hittats
  calculateTotalCourses(): number {
    return this.courses.reduce((sum, course) => sum + course.length, 0)
  }
}
