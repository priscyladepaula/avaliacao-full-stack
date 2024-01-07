import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Transferencias } from '../model/transferencias';
import { BehaviorSubject, Observable, catchError, retry, throwError } from 'rxjs';
import { CalculoTaxa } from '../model/transferencia-completa';

@Injectable({
  providedIn: 'root'
})
export class TransferenciasService {

  url = 'http://localhost:8080/transferencias'

  constructor(private http: HttpClient) { }

  agendarTransferencia(transferencia: Transferencias): Observable<Object> {
    return this.http.post(`${this.url}/agendar`, transferencia);
  }

  listarTransferencias(): Observable<Transferencias[]> {
    return this.http.get<Transferencias[]>(`${this.url}/agendamentos`).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  cancelarAgendamento(id: number): Observable<any> {
    return this.http.delete(`${this.url}/agendamentos/${id}`, { responseType: 'text' }).pipe(
      catchError(this.handleError)
    );
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }

}
