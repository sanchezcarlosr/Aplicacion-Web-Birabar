import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Combo } from 'src/app/models/combo';
import { Producto } from 'src/app/models/producto';
import { ComboService } from 'src/app/services/combo.service';
import { LoginService } from 'src/app/services/login.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-combo',
  templateUrl: './combo.component.html',
  styleUrls: ['./combo.component.css']
})
export class ComboComponent implements OnInit {

  combos!: Array<Combo>;
  comboModal: Combo = new Combo();
  productosModal!: Array<Producto>;
  modalidad!: string;

  constructor(private comboService: ComboService, private toastService: ToastrService,
    private productoService: ProductoService, private router: Router,
    public loginService: LoginService, private toastrService: ToastrService) {
    this.toastService.info("Para ver más información acerca de los combos, hacer click.");
    this.cargarCombos();
  }

  ngOnInit(): void {
  }

  cargarCombos() {
    this.combos = new Array<Combo>();
    this.comboService.obtenerCombos().subscribe(
      result => {
        result.forEach((element: any) => {
          let combo = new Combo();
          Object.assign(combo, element);

          combo.montoLista = 0;
          combo.productos.forEach(p => {
            this.productoService.obtenerProducto(p).subscribe(
              (result) => {
                combo.montoLista = combo.montoLista + result[0].precio;
              }
            );
          });

          this.combos.push(combo);
        });
      },
      error => {
        this.toastService.error("Error: ", error);
      }
    )
  }

  cargarProductos(combo: Combo) {
    this.productosModal = new Array<Producto>();
    this.comboModal = combo;
    this.comboModal.productos.forEach(id => { 
      this.productoService.obtenerProducto(id).subscribe(
        result => {
          let prod: Producto = new Producto();
          result.forEach((element: any) => {
            Object.assign(prod, element);
            this.productosModal.push(prod);
          });
        },
        error => {
          this.toastService.error("Error: ", error)
        }
      );
    });
  }

  setModalidad(modalidad: string) {
    this.router.navigate(["mis-pedidos/productos/", modalidad, this.comboModal._id]);
  }

  comprobarUsuario(): void {
    this.router.navigate(['login']);
    if (this.loginService.userLoggedIn() && (this.loginService.rolLogged() == 'Gestor' || this.loginService.rolLogged() == 'Administrador')) {
      this.toastrService.info("Ingresá o registrate como cliente para hacer un pedido.");
    } else {
      this.toastrService.info("Ingresá o registrate para hacer un pedido.");
    }
  }
}
