import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rdashboard } from './rdashboard';

describe('Rdashboard', () => {
  let component: Rdashboard;
  let fixture: ComponentFixture<Rdashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Rdashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Rdashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
