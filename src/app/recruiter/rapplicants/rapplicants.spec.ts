import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rapplicants } from './rapplicants';

describe('Rapplicants', () => {
  let component: Rapplicants;
  let fixture: ComponentFixture<Rapplicants>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Rapplicants]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Rapplicants);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
