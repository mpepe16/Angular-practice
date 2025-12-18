import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CavemanComponent } from './caveman.component';

describe('CavemanComponent', () => {
  let component: CavemanComponent;
  let fixture: ComponentFixture<CavemanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CavemanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CavemanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
