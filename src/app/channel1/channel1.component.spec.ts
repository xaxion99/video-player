import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Channel1Component } from './channel1.component';

describe('Channel1Component', () => {
  let component: Channel1Component;
  let fixture: ComponentFixture<Channel1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Channel1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Channel1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
