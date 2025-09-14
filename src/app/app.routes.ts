import { Routes } from '@angular/router';
import { MyCourses } from './pages/my-courses/my-courses';
import { ShowCourses } from './pages/show-courses/show-courses';

export const routes: Routes = [
    { path: "my-courses", component: MyCourses },
    { path: "show-courses", component: ShowCourses },
    { path: "", redirectTo: "show-courses", pathMatch: "full" }
];
