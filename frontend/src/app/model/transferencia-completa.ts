import { Transferencias } from "./transferencias";
import { differenceInDays } from 'date-fns';

export interface TransferenciaCompleta extends Transferencias {
    contaOrigem: number;
    contaDestino: number;
    valorTransferencia: number;
    dataTransferencia: Date;
    id: number;
    taxa: number;
    valorTotal: number;
}

export class CalculoTaxa extends Transferencias {
    taxa: number = 0;
    valorTotal: number = 0;

    constructor() {
        super();
    }

    calcularTaxa(dataFinal: Date, valor: number) {

        const diferencaDias = differenceInDays(dataFinal, new Date());

        if (diferencaDias === 0) {
            this.taxa = 3 + (0.03 * valor);
        } else if (diferencaDias <= 10) {
            this.taxa = 12;
        } else {
            if (diferencaDias > 40) {
                this.taxa = 0.017 * valor;
            } else if (diferencaDias > 30) {
                this.taxa = 0.047 * valor;
            } else if (diferencaDias > 20) {
                this.taxa = 0.069 * valor;
            } else if (diferencaDias > 10) {
                this.taxa = 0.082 * valor;
            }
        }
        
        this.valorTotal = valor + this.taxa;
    }

}