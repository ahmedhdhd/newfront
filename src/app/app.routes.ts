import { Routes } from '@angular/router';
import { DashbordComponent } from './Admin/dashbord/dashbord.component';
import { ListProduitComponent } from './Admin/Stock/GestionArticle/list-produit/list-produit.component';
import { ListUtilisateurComponent } from './Admin/Parametrage/Utilisateur/list-utilisateur/list-utilisateur.component';
import { ListFamilleComponent } from './Admin/Parametrage/Famille/list-famille/list-famille.component';
import { ListTypeComponent } from './Admin/Parametrage/Type/list-type/list-type.component';
import { ListGroupeComponent } from './Admin/Parametrage/Groupe/list-groupe/list-groupe.component';
import { AddEditProduitComponent } from './Admin/Stock/GestionArticle/add-edit-produit/add-edit-produit.component';
import { AddEditUtilisateurComponent } from './Admin/Parametrage/Utilisateur/add-edit-utilisateur/add-edit-utilisateur.component';
import { AddEditFamilleComponent } from './Admin/Parametrage/Famille/add-edit-famille/add-edit-famille.component';
import { AddEditTypeComponent } from './Admin/Parametrage/Type/add-edit-type/add-edit-type.component';
import { AddEditGroupeComponent } from './Admin/Parametrage/Groupe/add-edit-groupe/add-edit-groupe.component';
import { UserLoginComponent } from './Admin/Login/user-login/user-login.component';
import { AcceuilComponent } from './Commercial/Acceuil/acceuil/acceuil.component';

export const routes: Routes = [
  {path : '' , component : AcceuilComponent},
 { path: 'Admin',
    component:  DashbordComponent,
    children: [    
        {path : "login" , component : UserLoginComponent},

        {
            path: 'Produit',
            component: ListProduitComponent
          },
          {
            path: 'AddProduit',
            component: AddEditProduitComponent
          },
          {
            path: 'EditProduit/:id',
            component: AddEditProduitComponent
          },
          {
            path: 'User',
            component: ListUtilisateurComponent
          },
          {
            path: 'AddUser',
            component: AddEditUtilisateurComponent
          },
          {
            path: 'EditUser/:id',
            component: AddEditUtilisateurComponent
          },
          {
            path: 'Famille',
            component: ListFamilleComponent
          },
          {
            path: 'AddFamille',
            component: AddEditFamilleComponent
          },
          {
            path: 'EditFamille/:id',
            component: AddEditFamilleComponent
          },
          {
            path: 'Type',
            component: ListTypeComponent
          },
          {
            path: 'AddType',
            component: AddEditTypeComponent
          },
          {
            path: 'EditType/:id',
            component: AddEditTypeComponent
          },
          {
            path: 'Groupe',
            component: ListGroupeComponent
          },
          {
            path: 'AddGroupe',
            component: AddEditGroupeComponent
          },
          {
            path: 'EditGroupe/:id',
            component: AddEditGroupeComponent
          },
          {
            path: 'user',
            component: ListUtilisateurComponent
          }
      ]
  },
    
];
