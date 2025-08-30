import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Jobseeker } from './jobseeker';

describe('Jobseeker', () => {
  let component: Jobseeker;
  let fixture: ComponentFixture<Jobseeker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Jobseeker]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Jobseeker);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
