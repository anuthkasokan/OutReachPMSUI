import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleAssignmentComponent } from './role-assignment.component';

describe('UserProfileComponent', () => {
  let component: RoleAssignmentComponent;
  let fixture: ComponentFixture<RoleAssignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleAssignmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
