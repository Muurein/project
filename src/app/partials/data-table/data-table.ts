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
  displayedColumns: string[] = ["coursecode", "coursename", "coursepoints", "coursesubject"];
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
    this.dataSource.sort = this.sort;
  }

  //filtrerar datan
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filterPredicate = (data: Course, filter: string) => {
      const searchInput = filter.split(' ');

      return searchInput.every(term =>
        data.coursecode.toLowerCase().includes(term) ||
        data.coursename.toLowerCase().includes(term) ||
        data.coursepoints.toLowerCase().includes(term) ||
        data.coursesubject.toLowerCase().includes(term)
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
