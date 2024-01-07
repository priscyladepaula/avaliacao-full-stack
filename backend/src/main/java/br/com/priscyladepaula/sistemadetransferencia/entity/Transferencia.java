package br.com.priscyladepaula.sistemadetransferencia.entity;

import java.math.BigDecimal;
import java.time.LocalDate;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity(name = "tb_transferencia_financeira")
public class Transferencia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long contaOrigem;
    private Long contaDestino;
    private BigDecimal valorTransferencia;
    private BigDecimal taxa;
    private LocalDate dataTransferencia;

    @CreationTimestamp
    private LocalDate dataAgendamento;

    private BigDecimal valorTotal;

}
