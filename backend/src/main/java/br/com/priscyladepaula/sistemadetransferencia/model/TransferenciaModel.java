package br.com.priscyladepaula.sistemadetransferencia.model;

import java.math.BigDecimal;
import java.time.LocalDate;

import lombok.Data;

@Data
public class TransferenciaModel {
    private Long contaOrigem;
    private Long contaDestino;
    private BigDecimal valorTransferencia;
    private BigDecimal taxa;
    private LocalDate dataTransferencia;
}
