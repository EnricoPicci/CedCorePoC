import {Rapporto} from './rapporto';

export interface Customer {
    id: string;
    nome: string;
    cognome: string;
    ndg: string;
    rapporti: Array<Rapporto>;
}