import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Channel2Component } from './channel2.component';

describe('Channel2Component', () => {
  let component: Channel2Component;
  let fixture: ComponentFixture<Channel2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Channel2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Channel2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
