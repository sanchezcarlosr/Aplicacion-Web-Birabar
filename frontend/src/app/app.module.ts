import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginService } from './services/login.service';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { RegistroClienteComponent } from './components/registro-cliente/registro-cliente.component';
import { ProductoFormComponent } from './components/producto-form/producto-form.component';
import { GestionProductosComponent } from './components/gestion-productos/gestion-productos.component';
import { CategoriaFormComponent } from './components/categoria-form/categoria-form.component';
import { OfertaComponent } from './components/oferta/oferta.component';
import { OfertaGestionComponent } from './components/oferta-gestion/oferta-gestion.component';
import { OfertaFormComponent } from './components/oferta-form/oferta-form.component';
import { GestionCategoriaProductoComponent } from './components/gestion-categoria-producto/gestion-categoria-producto.component';
import { ListaProductosComponent } from './components/lista-productos/lista-productos.component';
import { FooterComponent } from './components/footer/footer.component';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { PerfilUsuarioComponent } from './components/perfil-usuario/perfil-usuario.component';
import { ComboFormComponent } from './components/combo-form/combo-form.component';
import { ComboComponent } from './components/combo/combo.component';
import { ComboGestionComponent } from './components/combo-gestion/combo-gestion.component';
import { NoAccessComponent } from './components/no-access/no-access.component';
import { PedidoComponent } from './components/pedido/pedido.component';
import { PedidoProductosComponent } from './components/pedido-productos/pedido-productos.component';
import { PedidoCalificacionComponent } from './components/pedido-calificacion/pedido-calificacion.component';
import { UsuarioGestionComponent } from './components/usuario-gestion/usuario-gestion.component';
import { UsuarioFormComponent } from './components/usuario-form/usuario-form.component';
import { GestionCartaComponent } from './components/gestion-carta/gestion-carta.component';
import { LocalInfoComponent } from './components/local-info/local-info.component';
import { AboutUsPageComponent } from './components/about-us-page/about-us-page.component';
import { PedidoGestionComponent } from './components/pedido-gestion/pedido-gestion.component';
import { PedidoGestionFormComponent } from './components/pedido-gestion-form/pedido-gestion-form.component';
import { CartaComponent } from './components/carta/carta.component';
import { CartaProductosComponent } from './components/carta-productos/carta-productos.component';
import { GestionWhatsAppComponent } from './components/gestion-whats-app/gestion-whats-app.component';
import { QRCodeModule } from 'angularx-qrcode';
import { ReporteComponent } from './components/reporte/reporte.component';
import { NgChartsModule } from 'ng2-charts';
import { RestobarFormComponent } from './components/restobar-form/restobar-form.component';
import { RestobarGestionComponent } from './components/restobar-gestion/restobar-gestion.component';
import { VentaComponent } from './components/venta/venta.component';
import { MesPipe } from './pipes/mes.pipe';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    RegistroClienteComponent,
    ProductoFormComponent,
    GestionProductosComponent,
    CategoriaFormComponent,
    OfertaComponent,
    OfertaGestionComponent,
    OfertaFormComponent,
    GestionCategoriaProductoComponent,
    ListaProductosComponent,
    FooterComponent,
    PerfilUsuarioComponent,
    ComboFormComponent,
    ComboComponent,
    ComboGestionComponent,
    NoAccessComponent,
    PedidoComponent,
    PedidoProductosComponent,
    PedidoCalificacionComponent,
    UsuarioGestionComponent,
    UsuarioFormComponent,
    GestionCartaComponent,
    LocalInfoComponent,
    AboutUsPageComponent,
    PedidoGestionComponent,
    PedidoGestionFormComponent,
    CartaComponent,
    CartaProductosComponent,
    GestionWhatsAppComponent,
    ReporteComponent,
    RestobarFormComponent,
    RestobarGestionComponent,
    VentaComponent,
    MesPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    QRCodeModule,
    NgChartsModule
  ],
  providers: [
    LoginService, 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
