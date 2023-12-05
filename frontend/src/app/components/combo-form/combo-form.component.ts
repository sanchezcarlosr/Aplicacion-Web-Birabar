import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Combo } from 'src/app/models/combo';
import { Producto } from 'src/app/models/producto';
import { ComboService } from 'src/app/services/combo.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-combo-form',
  templateUrl: './combo-form.component.html',
  styleUrls: ['./combo-form.component.css']
})
export class ComboFormComponent implements OnInit {

  combo!:Combo;
  accion!:string;
  productos!:Array<Producto>;
  precioLista!:number; 
  descuentoSeleccionado="";
  searchProducto!: string;
  buscarProducto: boolean = false;
  productosCombo!:Array<Producto>;



  constructor(private router:ActivatedRoute, private productoService:ProductoService, 
              private comboService:ComboService, private toast:ToastrService,
              private webTitle: Title,
              private route:Router) {
    
   }

  ngOnInit(): void {
    this.webTitle.setTitle("Birabar - Crear combo");
    this.precioLista = 0;
    this.productos=new Array<Producto>();

    this.cargarProductos();
    this.router.params.subscribe(params => {
      this.combo=new Combo();
      if (params['id'] == 0) {
        this.accion = "new";
      } else {
        this.accion="update";
        this.descuentoSeleccionado="final";
       this.cargarCombo(params['id']);
      }
    });
  }



  cargarCombo(id:string)
{
  this.comboService.obtenerComboById(id).subscribe(
    result=>
    {
      Object.assign(this.combo,result);
      this.cargarProductosCombo();
    },
    error=>
    {

    }
  )
}






  calcularPrecioLista():void{
    const acumulado = this.productosCombo.reduce((total, producto) => total + producto.precio, 0);
   this.precioLista = acumulado; 
  }


  calcularMontoFinal()
  {
    if(this.descuentoSeleccionado=="porcentaje")
      this.combo.montoFinal= this.precioLista - (this.precioLista*this.combo.descuento);
    else
      this.combo.descuento=  parseFloat(((100-((this.combo.montoFinal*100)/this.precioLista))/100).toFixed(2));
  
  }


  registrarCombo()
  {
    this.calcularMontoFinal();
    this.comboService.registrarCombo(this.combo).subscribe(
      result=>{

      this.toast.success("El combo se registro correctamente");
      this.route.navigateByUrl("comboGestion");
      },
      error=>
      { 

      }
    )
  }
  limpiarValores()
  {
    this.combo.montoFinal=0;
    this.combo.descuento=0; 

  }

modificarCombo() {
  this.calcularMontoFinal();
  this.comboService.editarCombo(this.combo).subscribe(
    result => {
      this.toast.success("Combo modificada correctamente");
      this.route.navigateByUrl("comboGestion")
    },
    error => {
      this.toast.error("Error:", error);
    }
  );
}



buscarPorNombreProducto() {
  if (this.searchProducto.trim() !== '') {
    const productosEncontrados = this.productos.filter(producto => producto.nombreProducto.toLowerCase().includes(this.searchProducto.toLowerCase()));
    this.productos = productosEncontrados;
  } else {
    this.cargarProductos();
  }
}



 cargarProductos() {
  this.productos = new Array<Producto>();
  this.productoService.obtenerProductosDisponibles().subscribe(
    result => {
      result.forEach((element: any) => {
        let producto: Producto = new Producto();
        Object.assign(producto, element);
        this.productos.push(producto);
      });
    },
    error => {
      console.log("Error procesando la operacion");
    }
  );
}


  agregarProductoToCombo(producto: Producto) {
    this.toast.success("Producto agregado al combo.");
    this.combo.productos.push(producto._id);
    this.cargarProductosCombo();
    this.limpiarValores();
  }



  /**
   * Permite carga un vector de productos.
   */
  cargarProductosCombo() {
    this.productosCombo = new Array<Producto>();
    this.combo.productos.forEach(id => { 
      this.productoService.obtenerProducto(id).subscribe(
        result => {
          let prod: Producto = new Producto();
          result.forEach((element: any) => {
            Object.assign(prod, element);
            this.productosCombo.push(prod);
          });
          this.calcularPrecioLista();
          this.calcularMontoFinal();

        }
      );
    });
  }


   quitarProductoToCombo(idProducto: string) {
    var indice: number = this.combo.productos.findIndex((prod) => prod == idProducto);
    this.toast.info("Producto quitado del combo.");
    this.combo.productos.splice(indice, 1);
    this.cargarProductosCombo();
    this.calcularPrecioLista();
    this.limpiarValores();
  }

  /**
   * Permite transformar una imagen a base64 y ademas permite validar el peso de dicha imagen.
   * @param event 
   */
  onFileSeleccionado(event: any) {
    if (event.target.files[0]) {
      const file = event.target.files[0];

      if (file.size >  1500000) {
        event.target.value = null;
        this.toast.warning("El tamaño maximo de la imagen es 15Mb");
      } else {
        const reader = new FileReader();
        reader.onload = () => {
          this.combo.imagen = reader.result as string;
        };
        reader.readAsDataURL(file);
      }
    }
  }
}
