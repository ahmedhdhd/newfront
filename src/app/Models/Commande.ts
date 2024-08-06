import { DétailsCommande } from "./DétailsCommande";

export class Commande {
    id!: number;
    date!: string;
    heure!: string;
    items!: DétailsCommande[];
    totalTTC!: number;
    totalTVA!: number;
    totalHT!: number;
    fraisLivraison!: number;
    status!: string;
    idUser!: number;
    NomRaisonSocial? : string ;
    MFcin ?: string ;
    Adresse?: string ;
    CodePostal?: string ;
    Gouvernorat?: string;
  }