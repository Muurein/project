import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceCoursdata } from './service-coursdata';

describe('ServiceCoursdata', () => {
  let component: ServiceCoursdata;
  let fixture: ComponentFixture<ServiceCoursdata>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceCoursdata]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceCoursdata);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
