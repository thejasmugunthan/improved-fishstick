import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rview } from './rview';

describe('Rview', () => {
  let component: Rview;
  let fixture: ComponentFixture<Rview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Rview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Rview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
