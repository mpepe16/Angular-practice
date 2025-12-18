import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CavemanCreateDialogComponent } from './caveman-create-dialog.component';

describe('CavemanCreateDialogComponent', () => {
  let component: CavemanCreateDialogComponent;
  let fixture: ComponentFixture<CavemanCreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CavemanCreateDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CavemanCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
