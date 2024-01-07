package br.com.priscyladepaula.sistemadetransferencia.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.priscyladepaula.sistemadetransferencia.entity.Transferencia;
import br.com.priscyladepaula.sistemadetransferencia.model.TransferenciaModel;
import br.com.priscyladepaula.sistemadetransferencia.service.TransferenciaService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/transferencias")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class TransferenciaController {

    @Autowired
    private TransferenciaService transferenciaService;

    @PostMapping("/agendar")
    public ResponseEntity<Transferencia> agendarTransferencia(@RequestBody TransferenciaModel transferenciaModel) {
        Transferencia transferencia = this.transferenciaService.agendarTransferencia(transferenciaModel);
  
        return ResponseEntity.status(HttpStatus.CREATED).body(transferencia);
    }

    @GetMapping("/agendamentos")
    public List<Transferencia> listarAgendamentos() {
        List<Transferencia> agendamentos = this.transferenciaService.listarAgendamentos();

        return agendamentos;
    }

    @DeleteMapping("/agendamentos/{id}")
    public ResponseEntity<String> deleteById(@PathVariable Long id){
        this.transferenciaService.deleteById(id);

        return ResponseEntity.ok().body("Agendamento cancelado!");
    }

}
