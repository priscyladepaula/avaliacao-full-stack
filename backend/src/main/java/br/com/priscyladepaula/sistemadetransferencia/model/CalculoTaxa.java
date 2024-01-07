package br.com.priscyladepaula.sistemadetransferencia.model;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

import br.com.priscyladepaula.sistemadetransferencia.entity.Transferencia;
import br.com.priscyladepaula.sistemadetransferencia.exception.TaxaNaoAplicavelException;

public class CalculoTaxa {

    public void calcularTaxaA(Transferencia transferencia) {
        BigDecimal valor = transferencia.getValorTransferencia();

        long diferencaDias = calcularDiferencaDias(transferencia);

        if (diferencaDias == 0) {
            transferencia.setTaxa(new BigDecimal("3.00").add(valor.multiply(new BigDecimal("0.03"))));
            transferencia.setValorTotal(transferencia.getTaxa().add(valor));
        } else {
            calcularTaxaB(transferencia);
        }

    }

    public void calcularTaxaB(Transferencia transferencia) {
        BigDecimal valor = transferencia.getValorTransferencia();

        long diferencaDias = calcularDiferencaDias(transferencia);

        if (diferencaDias <= 10) {
            transferencia.setTaxa(new BigDecimal("12.00"));
            transferencia.setValorTotal(transferencia.getTaxa().add(valor));
        } else {
            calcularTaxaC(transferencia);
        }

    }

    public void calcularTaxaC(Transferencia transferencia) {
        BigDecimal valor = transferencia.getValorTransferencia();

        long diferencaDias = calcularDiferencaDias(transferencia);

        if (diferencaDias > 40) {
            transferencia.setTaxa(new BigDecimal("0.017").multiply(valor));
            transferencia.setValorTotal(transferencia.getTaxa().add(valor));
        } else if (diferencaDias > 30) {
            transferencia.setTaxa(new BigDecimal("0.047").multiply(valor));
            transferencia.setValorTotal(transferencia.getTaxa().add(valor));
        } else if (diferencaDias > 20) {
            transferencia.setTaxa(new BigDecimal("0.069").multiply(valor));
            transferencia.setValorTotal(transferencia.getTaxa().add(valor));
        } else if (diferencaDias > 10) {
            transferencia.setTaxa(new BigDecimal("0.082").multiply(valor));
            transferencia.setValorTotal(transferencia.getTaxa().add(valor));
        } else {
            calcularTaxaD(transferencia);
        }
    }

    public void calcularTaxaD(Transferencia transferencia) {
        BigDecimal valorTransferencia = transferencia.getValorTransferencia();

        if (valorTransferencia.compareTo(BigDecimal.valueOf(1000)) <= 0) {
            calcularTaxaA(transferencia);
        } else if (valorTransferencia.compareTo(BigDecimal.valueOf(2000)) <= 0) {
            calcularTaxaB(transferencia);
        } else if (valorTransferencia.compareTo(BigDecimal.valueOf(2000)) > 0) {
            calcularTaxaC(transferencia);
        } else {
            throw new TaxaNaoAplicavelException("Não há taxa aplicável.");
        }
    }

    private long calcularDiferencaDias(Transferencia transferencia) {
        LocalDate dataFinal = transferencia.getDataTransferencia();
        long diferencaDias = ChronoUnit.DAYS.between(LocalDate.now(), dataFinal);
        return diferencaDias;
    }
}