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
  selector: 'app-my-table',
  imports: [CommonModule, MatTableModule, MatCellDef, MatInputModule, MatSortModule, MatFormFieldModule, MatButtonModule, MatSelectModule, FormsModule],
  templateUrl: './my-table.html',
  styleUrl: './my-table.css'
})

export class MyTable implements OnInit, AfterViewInit {

  //properties & interface
  myCourses: Course[] = [];
  myCategories: Course[] = [];
  displayedColumns: string[] = ["courseCode", "courseName", "points", "subject", "actions"];
  dataSource = new MatTableDataSource<Course>(this.myCourses);
  selectedValue: string = "";
  searchString: string = "";
  subjectCategory: string = "";


  //inleder sorteringen
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  //konstruktorn
  constructor(
    private ServiceCoursedata: ServiceCoursedata,
    private serviceRamschema: ServiceRamschema
  ) {}

  //när sidan laddas in
  ngOnInit(): void {

    this.myCourses = this.serviceRamschema.getCourses();

    this.updateCategories();

    this.dataSource.data = this.myCourses;

  }

  //lägg till kurs till ramschema
  addCourseToMyTable(course: Course): void {
    
    this.serviceRamschema.addCourse(course);
    this.myCourses = this.serviceRamschema.getCourses();
    this.dataSource.data = this.myCourses;

  }


  //ta bort kurs från ramschema
  deleteCourse(course: Course): void {
    this.serviceRamschema.deleteCourse(course.courseCode);
    this.myCourses = this.serviceRamschema.getCourses();
    this.dataSource.data = this.myCourses;

  }

    //filtrerar datan efter input i sökfältet
  searchFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchString = filterValue;
    this.dataSource.filter = this.searchString;
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

  //dropdown-meny för ämnessortering
  subjectFilter(event: string)  {
    this.subjectCategory = event.trim().toLowerCase();
    this.dataSource.filterPredicate = (data: Course, filter: string) => {
      return data.subject.toLowerCase() === this.subjectCategory;
    }

    this.dataSource.filter = " ";
  }

  // //filtrerar datan
  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   this.dataSource.filterPredicate = (data: Course, filter: string) => {
      
  //     const searchInput = filter.split(' ');

  //     return searchInput.every(term =>
  //       data.courseCode.toLowerCase().includes(term) ||
  //       data.courseName.toLowerCase().includes(term) ||
  //       data.subject.toLowerCase().includes(term)
  //     );
  //   };
  // }

  //sorterar datan
  sortCourses(direction: "desc") {
    this.displayedColumns.forEach(column => {
      this.sort.sort({id: column, start: direction, disableClear: true});
    });
  }

  //fitlrerar bort dublettämnen i filtreringen
  updateCategories() {
    this.myCategories = this.myCourses.filter((value, index, Array) =>
    index == Array.findIndex(course => course.subject == value.subject));
  }

  //visar hur många kurser som hittats
  calculateTotalCourses(): number {
    return this.dataSource.filteredData.length;
  }
  
  //räkna ihop det totala antalet högskolepoäng kurserna i ramschemat har
  calculateTotalPoints(): number {
    return this.myCourses.reduce((sum, course) => sum + course.points, 0);
  }

  
}
