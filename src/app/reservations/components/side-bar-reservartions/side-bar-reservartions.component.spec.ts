import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarReservartionsComponent } from './side-bar-reservartions.component';

describe('SideBarReservartionsComponent', () => {
  let component: SideBarReservartionsComponent;
  let fixture: ComponentFixture<SideBarReservartionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideBarReservartionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SideBarReservartionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
