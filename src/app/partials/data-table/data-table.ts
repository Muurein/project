import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatTableModule, MatCellDef } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Course } from '../../model/course';
import { ServiceCoursedata } from '../../services/coursedata/service-coursedata';


@Component({
  selector: 'app-data-table',
  imports: [CommonModule, MatTableModule, MatCellDef, MatInputModule, MatSortModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './data-table.html',
  styleUrl: './data-table.css'
})

export class DataTable implements OnInit, AfterViewInit {

  //properties & interface
  courses: Course[] = [];
  displayedColumns: string[] = ["courseCode", "courseName", "points", "subject"];
  dataSource = new MatTableDataSource<Course>([]);

  //inleder sorteringen
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  //konstruktorn
  constructor(private ServiceCoursedata: ServiceCoursedata) {}

  //när sidan laddas in
  ngOnInit(): void {
    
    this.ServiceCoursedata.getCourses().subscribe((courses) => {
      
      this.courses = courses;
      this.dataSource.data = this.courses;
    });
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
