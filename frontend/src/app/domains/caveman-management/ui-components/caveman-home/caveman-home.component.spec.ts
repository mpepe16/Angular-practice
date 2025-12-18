import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CavemanHomeComponent } from './caveman-home.component';

describe('CavemanHomeComponent', () => {
  let component: CavemanHomeComponent;
  let fixture: ComponentFixture<CavemanHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CavemanHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CavemanHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
