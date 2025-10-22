import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mainmenu } from './mainmenu';

describe('Mainmenu', () => {
  let component: Mainmenu;
  let fixture: ComponentFixture<Mainmenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Mainmenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Mainmenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
