import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Jlist } from './jlist';

describe('Jlist', () => {
  let component: Jlist;
  let fixture: ComponentFixture<Jlist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Jlist]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Jlist);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
