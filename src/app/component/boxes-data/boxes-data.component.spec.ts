import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxesDataComponent } from './boxes-data.component';

describe('BoxesDataComponent', () => {
  let component: BoxesDataComponent;
  let fixture: ComponentFixture<BoxesDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoxesDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoxesDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
