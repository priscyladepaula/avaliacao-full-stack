import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Transferencias } from 'src/app/model/transferencias';
import { TransferenciaCompleta } from 'src/app/model/transferencia-completa';
import { TransferenciasService } from 'src/app/service/transferencias.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalculoTaxa } from 'src/app/model/transferencia-completa';

@Component({
  selector: 'app-agendar-transferencia',
  templateUrl: './agendar-transferencia.component.html',
  styleUrls: ['./agendar-transferencia.component.css']
})
export class AgendarTransferenciaComponent implements OnInit {

  transferencia: Transferencias = new Transferencias();
  formulario!: FormGroup;
  showPopup: boolean = false;

  calculoTaxa: CalculoTaxa | null = null;

  constructor(private transferenciaService: TransferenciasService, private formBuilder: FormBuilder) { }

  revisarTransferencia() {
    if (this.formulario.valid) {
      this.transferencia = this.formulario.value;
      this.calculoTaxa = new CalculoTaxa();
      this.calculoTaxa.calcularTaxa(this.transferencia.dataTransferencia!, this.transferencia.valorTransferencia!);
      this.openPopup();
    } else {
      alert("Preencher o formulário corretamente!");
    }
  }

  desabilitarDatasAnteriores(): string {
    var dtHoje = new Date();

    var mes = dtHoje.getMonth() + 1;
    var ano = dtHoje.getFullYear();
    var dia = dtHoje.getDate();

    return `${ano}-${mes.toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;

  }

  confirmarCadastro() {
    this.transferenciaService.agendarTransferencia(this.transferencia).subscribe({
      next: () => {
        alert("Transferência agendada!");
        this.closePopup();
        this.limparFormulario();
      },
      error: (erro) => {
        console.log(erro);
      }
    })

  }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      contaOrigem: ['', Validators.required],
      contaDestino: ['', Validators.required],
      valorTransferencia: ['', Validators.required],
      dataTransferencia: ['', Validators.required]
    });

    this.desativarControles();
  }

  openPopup() {
    this.showPopup = true;
    this.desativarControles();
  }

  closePopup() {
    this.showPopup = false;
    this.desativarControles();
  }

  private desativarControles() {
    const formControls = Object.values(this.formulario.controls);
    formControls.forEach(control => {
      if (this.showPopup) {
        control.disable();
      } else {
        control.enable();
      }
    });
  }

  limparFormulario(): void {
    this.formulario.reset();
  }

}
