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
  displayedColumns: string[] = ["courseCode", "courseName", "points", "subject"];
  dataSource = new MatTableDataSource<Course>(this.myCourses);


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

    this.dataSource.data = this.myCourses;

  }

  //lägg till kurs till ramschema
  addCourseToMyTable(course: Course): void {
    this.serviceRamschema.addCourse(course);
    this.myCourses = this.serviceRamschema.getCourses();
    this.dataSource.data = this.myCourses;
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

  //sorterar datan
  sortCourses(direction: "desc") {
    this.displayedColumns.forEach(column => {
      this.sort.sort({id: column, start: direction, disableClear: true});
    });
  };
}
