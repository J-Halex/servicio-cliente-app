import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './helpers';

import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor, ErrorInterceptor } from './helpers';
import { AppComponent } from './app.component';
import { AlertComponent } from './components';
import { HomeComponent } from './home';
import { FormularioServicioComponent } from './cliente/formulario-servicio/formulario-servicio.component';
import { StatusTransformPipe } from './status-transform.pipe';
import { FechaTransformPipe } from './fecha-transform.pipe';
import { VistaServicioComponent } from './serviciosalcliente/vista-servicio/vista-servicio.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        FormularioServicioComponent,
        StatusTransformPipe,
        FechaTransformPipe,
        VistaServicioComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { };