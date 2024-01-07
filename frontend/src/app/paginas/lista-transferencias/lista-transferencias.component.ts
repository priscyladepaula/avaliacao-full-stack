import { Component, OnInit } from '@angular/core';
import { TransferenciasService } from 'src/app/service/transferencias.service';
import { TransferenciaCompleta } from 'src/app/model/transferencia-completa'
import { Transferencias } from 'src/app/model/transferencias';

@Component({
  selector: 'app-lista-transferencias',
  templateUrl: './lista-transferencias.component.html',
  styleUrls: ['./lista-transferencias.component.css']
})
export class ListaTransferenciasComponent implements OnInit {

  listaTransferencias: TransferenciaCompleta[] = [];

  constructor(private transferenciaService: TransferenciasService) {

  }

  ngOnInit(): void {
    this.getTransferencias();
  }

  getTransferencias() {
    this.transferenciaService.listarTransferencias().subscribe(
      (transferencias: any) => {
        this.listaTransferencias = transferencias;
      }
    );
  }

  cancelarTransferencia(id: number): void {
    const confirmacao = window.confirm('Tem certeza que deseja cancelar o agendamento?');
    if (confirmacao) {
      this.transferenciaService.cancelarAgendamento(id).subscribe({
        next: () => {
          alert('Agendamento cancelado!')
          this.getTransferencias();
        },
        error: (error) => {
          console.log('Erro ao deletar transferência', error);
        }
      })
    }

  }

}
