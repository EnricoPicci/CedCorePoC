import {Rapporto} from './rapporto';

export interface Customer {
    customerId: string;
    nome: string;
    cognome: string;
    ndg: string;
    rapporti: Array<Rapporto>;
}