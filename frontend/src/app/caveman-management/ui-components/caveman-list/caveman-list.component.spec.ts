import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CavemanListComponent } from './caveman-list.component';

describe('CavemanListComponent', () => {
  let component: CavemanListComponent;
  let fixture: ComponentFixture<CavemanListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CavemanListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CavemanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
