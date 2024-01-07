package br.com.priscyladepaula.sistemadetransferencia.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.priscyladepaula.sistemadetransferencia.entity.Transferencia;
import br.com.priscyladepaula.sistemadetransferencia.exception.TaxaNaoAplicavelException;
import br.com.priscyladepaula.sistemadetransferencia.model.CalculoTaxa;
import br.com.priscyladepaula.sistemadetransferencia.model.TransferenciaModel;
import br.com.priscyladepaula.sistemadetransferencia.repository.TransferenciaRepository;

@Service
public class TransferenciaService {

    @Autowired
    private TransferenciaRepository transferenciaRepository;

    public Transferencia agendarTransferencia(TransferenciaModel transferenciaModel) {
        Transferencia transferencia = new Transferencia();

        transferencia.setContaOrigem(transferenciaModel.getContaOrigem());
        transferencia.setContaDestino(transferenciaModel.getContaDestino());
        transferencia.setValorTransferencia(transferenciaModel.getValorTransferencia());

        transferencia.setDataAgendamento(LocalDate.now());

        transferencia.setDataTransferencia(
                transferenciaModel.getDataTransferencia() != null ? transferenciaModel.getDataTransferencia()
                        : transferencia.getDataAgendamento());

        //A tratativa das taxas A ao D estão em uma classe
        CalculoTaxa calculoTaxa = new CalculoTaxa();
        
        try {
            calculoTaxa.calcularTaxaA(transferencia);
        } catch (TaxaNaoAplicavelException e) {
            throw new TaxaNaoAplicavelException("Taxa A não aplicável para a transferência.");
        }

        try {
            calculoTaxa.calcularTaxaB(transferencia);
        } catch (TaxaNaoAplicavelException e) {
            throw new TaxaNaoAplicavelException("Taxa B não aplicável para a transferência.");
        }

        try {
            calculoTaxa.calcularTaxaC(transferencia);
        } catch (TaxaNaoAplicavelException e) {
            throw new TaxaNaoAplicavelException("Taxa C não aplicável para a transferência.");
        }

        return transferenciaRepository.save(transferencia);

    }

    public List<Transferencia> listarAgendamentos() {
        return transferenciaRepository.findAll();
    }

    public void deleteById(Long id){
        this.transferenciaRepository.deleteById(id);
    }

}
