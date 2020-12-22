import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewgameComponent } from './viewgame.component';

describe('ViewgameComponent', () => {
  let component: ViewgameComponent;
  let fixture: ComponentFixture<ViewgameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewgameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewgameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
