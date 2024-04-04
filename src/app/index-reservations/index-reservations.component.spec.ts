import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexReservationsComponent } from './index-reservations.component';

describe('IndexReservationsComponent', () => {
  let component: IndexReservationsComponent;
  let fixture: ComponentFixture<IndexReservationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexReservationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IndexReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
