import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AgendarTransferenciaComponent } from './paginas/agendar-transferencia/agendar-transferencia.component';
import { ListaTransferenciasComponent } from './paginas/lista-transferencias/lista-transferencias.component';
import { HomePageComponent } from './paginas/home-page/home-page.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { PopupComponent } from './shared/popup/popup/popup.component';
import { TransferenciasService } from './service/transferencias.service';

const routes: Routes = [
  { path: 'agendar', component: AgendarTransferenciaComponent },
  { path: 'home-page', component: HomePageComponent },
  { path: '', redirectTo: 'home-page', pathMatch: 'full' },
  { path: 'lista-transferencias', component: ListaTransferenciasComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    AgendarTransferenciaComponent,
    ListaTransferenciasComponent,
    HomePageComponent,
    PopupComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
  ],
  providers: [TransferenciasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
