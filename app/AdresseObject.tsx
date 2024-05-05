export interface AdresseType {
    _id: string;
    nom: string;
}

export interface AdressesTypeProps {
    types: AdresseType[];
}

export interface Adresse {
    _id: string;
    type: string;
    nom: string;
    adresse: string;
    ville: string;
    codepostal: string;
    pays: string;
    typeBar: string;
    prixMoyen: string;
    typeArt: string;
    gratuitPayant: string;
    prix: string;
    courantArtistique: string;
    publicPrive: string;
    typeParc: string;
    nbEtoile: string;
    typeCuisine: string;
}

export interface AdressesProps {
    adresses: Adresse[];
}