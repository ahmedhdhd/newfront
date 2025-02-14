import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemProduitComponent } from './item-produit.component';

describe('ItemProduitComponent', () => {
  let component: ItemProduitComponent;
  let fixture: ComponentFixture<ItemProduitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemProduitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
