import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CalculoTaxa } from 'src/app/model/transferencia-completa';
import { Transferencias } from 'src/app/model/transferencias';
import { TransferenciasService } from 'src/app/service/transferencias.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})

export class PopupComponent implements OnInit {

  @Input() dadosTransferencia!: Transferencias;
  @Input() calculoTaxa: CalculoTaxa | null = null;
  
  @Output() fecharPopup = new EventEmitter<void>();
  @Output() confirmarCadastro = new EventEmitter<any>();

  constructor(private transferenciaService: TransferenciasService){}

  confirmar() {
    this.confirmarCadastro.emit();
  }

  fechar() {
    this.fecharPopup.emit();
  }

  ngOnInit() {
  }


}
