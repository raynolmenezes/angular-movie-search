import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewSidebarComponent } from './preview-sidebar.component';

describe('PreviewSidebarComponent', () => {
  let component: PreviewSidebarComponent;
  let fixture: ComponentFixture<PreviewSidebarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreviewSidebarComponent]
    });
    fixture = TestBed.createComponent(PreviewSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
