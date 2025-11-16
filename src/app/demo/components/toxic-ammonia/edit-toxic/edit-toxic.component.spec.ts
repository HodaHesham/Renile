import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditToxicComponent } from './edit-toxic.component';

describe('EditToxicComponent', () => {
  let component: EditToxicComponent;
  let fixture: ComponentFixture<EditToxicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditToxicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditToxicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
