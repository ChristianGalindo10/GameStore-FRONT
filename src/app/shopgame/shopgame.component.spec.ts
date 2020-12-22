import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopgameComponent } from './shopgame.component';

describe('ShopgameComponent', () => {
  let component: ShopgameComponent;
  let fixture: ComponentFixture<ShopgameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopgameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopgameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
