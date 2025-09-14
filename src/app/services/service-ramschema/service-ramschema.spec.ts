import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceRamschema } from './service-ramschema';

describe('ServiceRamschema', () => {
  let component: ServiceRamschema;
  let fixture: ComponentFixture<ServiceRamschema>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceRamschema]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceRamschema);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
