import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditGroupeComponent } from './add-edit-groupe.component';

describe('AddEditGroupeComponent', () => {
  let component: AddEditGroupeComponent;
  let fixture: ComponentFixture<AddEditGroupeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditGroupeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditGroupeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
