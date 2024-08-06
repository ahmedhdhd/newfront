import { Component, OnInit } from '@angular/core';
import { DetailsCommandeService } from '../../../../../Services/details-commande.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommandeService } from '../../../../../Services/commande.service';
import { DétailsCommande } from '../../../../../Models/DétailsCommande';
import { AddEditItemModalComponent } from '../add-edit-item-modal/add-edit-item-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from '../../../../../text-input/text-input.component';

@Component({
  selector: 'app-details-commande',
  standalone: true,
  imports: [TextInputComponent,FormsModule,CommonModule,RouterModule ,ReactiveFormsModule ],
  templateUrl: './details-commande.component.html',
  styleUrl: './details-commande.component.css'
})
export class DetailsCommandeComponent implements OnInit {
  commande?: any;
  ide: any;

  constructor(
    private DetailsCommandeService: DetailsCommandeService,
    private CommandeService: CommandeService,

    private route: ActivatedRoute,
    private dialog: MatDialog ) {  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.ide = parseInt(id, 10);
      this.getOrderDetails(this.ide);
    }
  }

  getOrderDetails(id: number) {
    this.CommandeService.getCommandebyid(id.toString()).subscribe({
      next: commande => {
        console.log(commande);
        this.commande = commande;
      },
      error: err => console.error(err)
    });
  }

  deleteitems(commandid: number, itemid: number) {
    this.DetailsCommandeService.deleteitems(commandid, itemid).subscribe({
      next: () => {
        this.getOrderDetails(this.ide);
      },
      error: err => console.error(err)
    });
  }

  additem(commandid: number, item: DétailsCommande) {
    this.DetailsCommandeService.addItemToCommande(commandid, item).subscribe({
      next: () => {
        this.getOrderDetails(this.ide);
      },
      error: err => console.error(err)
    });
  }

  updateItem(commandid: number, itemid: number, item: DétailsCommande) {
    this.DetailsCommandeService.updateItem(commandid, itemid, item).subscribe({
      next: () => {
        this.getOrderDetails(this.ide);
      },
      error: err => console.error(err)
    });
  }

  openAddItemModal() {
    const dialogRef = this.dialog.open(AddEditItemModalComponent);

    dialogRef.componentInstance.itemAdded.subscribe((item: DétailsCommande) => {
      this.handleItemAdded(item);
    });

    dialogRef.afterClosed().subscribe(() => {
    });
  }

  openEditItemModal(item: DétailsCommande , id : number) {
    const dialogRef = this.dialog.open(AddEditItemModalComponent, {
      data: item 
    });

    dialogRef.componentInstance.itemAdded.subscribe((updatedItem: DétailsCommande) => {
      this.handleItemUpdated(updatedItem , id);
    });

    dialogRef.afterClosed().subscribe(() => {
    });
  }

  handleItemAdded(item: DétailsCommande) {
    this.additem(this.ide, item);
  }

  handleItemUpdated(item: DétailsCommande , id : number) {
    this.updateItem(this.ide, id , item);
  }
}
