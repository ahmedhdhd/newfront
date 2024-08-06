import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListGroupeComponent } from "./Admin/Parametrage/Groupe/list-groupe/list-groupe.component";
import { AddEditGroupeComponent } from "./Admin/Parametrage/Groupe/add-edit-groupe/add-edit-groupe.component";
import { AddEditFamilleComponent } from "./Admin/Parametrage/Famille/add-edit-famille/add-edit-famille.component";
import { ListFamilleComponent } from "./Admin/Parametrage/Famille/list-famille/list-famille.component";
import { AddEditTypeComponent } from "./Admin/Parametrage/Type/add-edit-type/add-edit-type.component";
import { ListTypeComponent  } from "./Admin/Parametrage/Type/list-type/list-type.component";
import { ListUtilisateurComponent } from "./Admin/Parametrage/Utilisateur/list-utilisateur/list-utilisateur.component";
import { AddEditUtilisateurComponent } from "./Admin/Parametrage/Utilisateur/add-edit-utilisateur/add-edit-utilisateur.component";
import { ListProduitComponent } from "./Admin/Stock/GestionArticle/list-produit/list-produit.component";
import { AddEditProduitComponent } from "./Admin/Stock/GestionArticle/add-edit-produit/add-edit-produit.component";
import { DashbordComponent } from "./Admin/dashbord/dashbord.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ListGroupeComponent, AddEditGroupeComponent, AddEditFamilleComponent, ListFamilleComponent, AddEditTypeComponent, ListTypeComponent, ListUtilisateurComponent, AddEditUtilisateurComponent, ListProduitComponent, AddEditProduitComponent, DashbordComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Ecommerce';
}
