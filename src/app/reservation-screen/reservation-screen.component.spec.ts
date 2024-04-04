import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationScreenComponent } from './reservation-screen.component';

describe('ReservationScreenComponent', () => {
  let component: ReservationScreenComponent;
  let fixture: ComponentFixture<ReservationScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationScreenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReservationScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
