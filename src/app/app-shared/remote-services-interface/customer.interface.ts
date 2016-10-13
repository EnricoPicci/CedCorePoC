import {Rapporto} from './rapporto.interface';

export interface Customer {
    customerId: string;
    nome: string;
    cognome: string;
    ndg: string;
    rapporti: Array<Rapporto>;
}