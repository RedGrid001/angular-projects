import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelFuncionarioComponent } from './model-funcionario.component';

describe('ModelFuncionarioComponent', () => {
  let component: ModelFuncionarioComponent;
  let fixture: ComponentFixture<ModelFuncionarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelFuncionarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
