import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegistroClienteComponent } from './components/registro-cliente/registro-cliente.component';
import { CategoriaFormComponent } from './components/categoria-form/categoria-form.component';
import { ProductoFormComponent } from './components/producto-form/producto-form.component';
import { OfertaComponent } from './components/oferta/oferta.component';
import { OfertaGestionComponent } from './components/oferta-gestion/oferta-gestion.component';
import { OfertaFormComponent } from './components/oferta-form/oferta-form.component';
import { PerfilUsuarioComponent } from './components/perfil-usuario/perfil-usuario.component';
import { LoginGuardGuard } from './guards/login-guard.guard';
import { ComboFormComponent } from './components/combo-form/combo-form.component';
import { ComboComponent } from './components/combo/combo.component';
import { ComboGestionComponent } from './components/combo-gestion/combo-gestion.component';
import { NoAccessComponent } from './components/no-access/no-access.component';
import { GestorGuardGuard } from './guards/gestor-guard.guard';
import { GestionCategoriaProductoComponent } from './components/gestion-categoria-producto/gestion-categoria-producto.component';
import { GestionProductosComponent } from './components/gestion-productos/gestion-productos.component';
import { ListaProductosComponent } from './components/lista-productos/lista-productos.component';
import { PedidoComponent } from './components/pedido/pedido.component';
import { PedidoProductosComponent } from './components/pedido-productos/pedido-productos.component';
import { UsuarioFormComponent } from './components/usuario-form/usuario-form.component';
import { UsuarioGestionComponent } from './components/usuario-gestion/usuario-gestion.component';
import { AdminGuardGuard } from './guards/admin-guard.guard';
import { GestionCartaComponent } from './components/gestion-carta/gestion-carta.component';
import { PedidoCalificacionComponent } from './components/pedido-calificacion/pedido-calificacion.component';
import { LocalInfoComponent } from './components/local-info/local-info.component';
import { AboutUsPageComponent } from './components/about-us-page/about-us-page.component';
import { PedidoGestionComponent } from './components/pedido-gestion/pedido-gestion.component';
import { PedidoGestionFormComponent } from './components/pedido-gestion-form/pedido-gestion-form.component';
import { CartaComponent } from './components/carta/carta.component';
import { CartaProductosComponent } from './components/carta-productos/carta-productos.component';
import { GestionWhatsAppComponent } from './components/gestion-whats-app/gestion-whats-app.component';
import { ReporteComponent } from './components/reporte/reporte.component';
import { RestobarFormComponent } from './components/restobar-form/restobar-form.component';
import { RestobarGestionComponent } from './components/restobar-gestion/restobar-gestion.component';
import { VentaComponent } from './components/venta/venta.component';


const routes: Routes = [
  { path: "", redirectTo: "principal", pathMatch: "full" },
  { path: 'principal', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroClienteComponent },
  { path: 'perfil', component: PerfilUsuarioComponent , canActivate: [LoginGuardGuard]},
  { path: 'no-access', component: NoAccessComponent},
  { path: 'alta-categoria/:id', component: CategoriaFormComponent, canActivate: [GestorGuardGuard]},
  { path:'alta-producto/:id', component:ProductoFormComponent, canActivate: [GestorGuardGuard]},
  { path:"ofertas", component:OfertaComponent},
  { path:"ofertaGestion", component:OfertaGestionComponent, canActivate: [GestorGuardGuard]},
  { path:"oferta-form/:id", component:OfertaFormComponent, canActivate: [GestorGuardGuard]},
  { path:"combo-form/:id", component:ComboFormComponent, canActivate: [GestorGuardGuard]},
  { path:"combos", component:ComboComponent},
  { path:"comboGestion", component:ComboGestionComponent, canActivate: [GestorGuardGuard]},
  { path:'gestion-productos', component:GestionProductosComponent, canActivate: [GestorGuardGuard]},
  { path:'gestion-categoria-producto/:id', component:GestionCategoriaProductoComponent, canActivate: [GestorGuardGuard]},
  { path:'lista-productos', component:ListaProductosComponent},
  { path: 'mis-pedidos', component: PedidoComponent },
  { path: 'mis-pedidos/productos/:modalidad', component: PedidoProductosComponent },
  { path: 'mis-pedidos/productos/:modalidad/:idcombo', component: PedidoProductosComponent },
  { path: 'mis-pedidos/calificacion/:id', component: PedidoCalificacionComponent },
  { path: 'pedidos/gestion', component: PedidoGestionComponent, canActivate: [GestorGuardGuard] },
  { path: 'pedidos/gestion/:id', component: PedidoGestionFormComponent, canActivate: [GestorGuardGuard] },
  { path: 'usuario-form/:id', component: UsuarioFormComponent, canActivate: [AdminGuardGuard]},
  { path: 'usuarioGestion', component: UsuarioGestionComponent, canActivate: [AdminGuardGuard]},
  {path: 'gestion-carta', component: GestionCartaComponent, canActivate: [GestorGuardGuard]},
  {path: 'local-info', component: LocalInfoComponent},
  {path: 'about-us-page', component: AboutUsPageComponent},
  {path: 'menu', component:CartaComponent},
  {path: 'menu-productos/:id', component: CartaProductosComponent},
  {path: 'reporte', component: ReporteComponent,canActivate: [AdminGuardGuard]},
  {path: 'gestion-whatsapp', component: GestionWhatsAppComponent, canActivate: [GestorGuardGuard]},
  {path: 'restobar-form/:id', component:  RestobarFormComponent, canActivate: [GestorGuardGuard]},
  {path: 'gestion-restobar', component: RestobarGestionComponent, canActivate: [GestorGuardGuard]},
  {path: 'ventas', component: VentaComponent, canActivate: [AdminGuardGuard]},
  {path: 'gestion-whatsapp/enviarMensaje', component: GestionWhatsAppComponent, canActivate: [GestorGuardGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
