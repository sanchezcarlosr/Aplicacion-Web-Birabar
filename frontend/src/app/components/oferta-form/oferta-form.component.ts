import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Oferta } from 'src/app/models/oferta';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { ToastrService } from 'ngx-toastr';
import { OfertaService } from 'src/app/services/oferta.service';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-oferta-form',
  templateUrl: './oferta-form.component.html',
  styleUrls: ['./oferta-form.component.css']
})

export class OfertaFormComponent implements OnInit {

  accion!: string;
  searchProducto!: string;
  oferta: Oferta;
  productos!: Array<Producto>;
  productosOferta!: Array<Producto>;
  buscarProducto: boolean = false;
  lunes: boolean = false;
  martes: boolean = false;
  miercoles: boolean = false;
  jueves: boolean = false;
  viernes: boolean = false;
  sabado: boolean = false;
  domingo: boolean = false;

  /**
   * @constructor
   * @param rutaActiva 
   * @param productoService 
   * @param toastrService 
   * @param ofertaService 
   * @param webTitle 
   */
  constructor(private rutaActiva: ActivatedRoute, private productoService: ProductoService, private toastrService: ToastrService, private ofertaService: OfertaService, private webTitle: Title, private router: Router) {
    this.oferta = new Oferta();
    this.productos = new Array<Producto>();
    this.oferta.productos = new Array<string>();
    this.cargarProductos();
  }

  ngOnInit(): void {
    this.webTitle.setTitle("Birabar - Crear oferta");
    this.rutaActiva.params.subscribe(params => {
      if (params['id'] == 0) {
        this.toastrService.info("Complete todos los campos para crear una oferta.");
        this.accion = "new";
        this.oferta.dias = new Array<string>();
      } else {
        this.toastrService.info("Modifique algunos campos y guarde los cambios para modificar la oferta.");
        this.accion = "update";
        this.cargarOferta(params['id']);
      }
    });
  }

  /**
   * Metodo que permite registrar la oferta en la BD.
   */
  crearOferta() {
    this.agregarDiasToOferta();
    this.ofertaService.registrarOferta(this.oferta).subscribe(
      result => {
        this.toastrService.success("Oferta registrada correctamente");
        this.router.navigate(['ofertaGestion']);
      },
      error => {
        this.toastrService.error("Error:", error);
      }
    );
  }

  /**
   * Metodo que permite cargar todos los productos disponibles en un Array.
   * Se utiliza a la hora de seleccionar los productos de la oferta.
   */
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

  /**
   * Permite agregar un producto al array de productos que contiene la oferta.
   * Se utiliza a la hora de seleccionar los productos.
   * @param producto 
   */
  agregarProductoToOferta(producto: Producto) {
    if(this.oferta.productos.includes(producto._id)){
      this.toastrService.warning("El producto ya está en la oferta.");
    }else{
      this.toastrService.success("Producto agregado a la oferta.");
      this.oferta.productos.push(producto._id);
      this.cargarProductosOferta();
    }
  }

  /**
   * Permite eliminar un producto del array de productos que contiene la oferta.
   * @param idProducto
   */
  quitarProductoToOferta(idProducto: string) {
    var indice: number = this.oferta.productos.findIndex((prod) => prod == idProducto);
    this.toastrService.info("Producto quitado de la oferta.");
    this.oferta.productos.splice(indice, 1);
    this.cargarProductosOferta();
  }

  /**
   * Permite verificar que algun checkbox haya sido marcado como verdadero.
   * @returns
   */
  verificarCheboxes(): boolean {
    return this.lunes || this.martes || this.miercoles || this.jueves || this.viernes || this.sabado || this.domingo;
  }

  /**
   * - - Intentar Mejorar/Optimizar - -
   * Permite cargar los días de una oferta en el formulario.
   * Se utiliza cuando se intenta modificar un día. 
   */
  cargarDias() {
    for (const dia of this.oferta.dias) {
      if (dia == "Lunes") {
        this.lunes = true;
      }
      if (dia == "Martes") {
        this.martes = true;
      }
      if (dia == "Miercoles") {
        this.miercoles = true;
      }
      if (dia == "Jueves") {
        this.jueves = true;
      }
      if (dia == "Viernes") {
        this.viernes = true;
      }
      if (dia == "Sabado") {
        this.sabado = true;
      }
      if (dia == "Domingo") {
        this.domingo = true;
      }
    }
  }

  /** 
   * - - Intentar Mejorar/Optimizar - -
   * Permite agregar los días seleccionados(Checkboxes) a la oferta.
   */
  private agregarDiasToOferta() {
    this.oferta.dias = new Array<string>();
    if (this.lunes) {
      this.oferta.dias.push("Lunes");
    } else {
      const index = this.oferta.dias.indexOf("Lunes");
      if (index !== -1) {
        this.oferta.dias.splice(index, 1);
      }
    }
    if (this.martes) {
      this.oferta.dias.push("Martes");
    } else {
      const index = this.oferta.dias.indexOf("Martes");
      if (index !== -1) {
        this.oferta.dias.splice(index, 1);
      }
    }
    if (this.miercoles) {
      this.oferta.dias.push("Miercoles");
    } else {
      const index = this.oferta.dias.indexOf("Miercoles");
      if (index !== -1) {
        this.oferta.dias.splice(index, 1);
      }
    }
    if (this.jueves) {
      this.oferta.dias.push("Jueves");
    } else {
      const index = this.oferta.dias.indexOf("Jueves");
      if (index !== -1) {
        this.oferta.dias.splice(index, 1);
      }
    }
    if (this.viernes) {
      this.oferta.dias.push("Viernes");
    } else {
      const index = this.oferta.dias.indexOf("Viernes");
      if (index !== -1) {
        this.oferta.dias.splice(index, 1);
      }
    }
    if (this.sabado) {
      this.oferta.dias.push("Sabado");
    } else {
      const index = this.oferta.dias.indexOf("Sabado");
      if (index !== -1) {
        this.oferta.dias.splice(index, 1);
      }
    }
    if (this.domingo) {
      this.oferta.dias.push("Domingo");
    } else {
      const index = this.oferta.dias.indexOf("Domingo");
      if (index !== -1) {
        this.oferta.dias.splice(index, 1);
      }
    }
  }

  /**
   * Permite transformar una imagen a base64 y ademas permite validar el peso de dicha imagen.
   * @param event 
   */
  onFileSeleccionado(event: any) {
    if (event.target.files[0]) {
      const file = event.target.files[0];
      if (file.size > 1600000) {
        event.target.value = null;
        this.toastrService.warning("El tamaño maximo de la imagen es 16Mb");
      } else {
        const reader = new FileReader();
        reader.onload = () => {
          this.oferta.imagen = reader.result as string;
        };
        reader.readAsDataURL(file);
      }
    }
  }

  /**
   * Permite buscar una oferta dependiendo el ID.
   * @param id 
   */
  cargarOferta(id: string) {
    this.ofertaService.obtenerOferta(id).subscribe(
      result => {
        result.forEach((element: any) => {
          Object.assign(this.oferta, element);
          this.cargarDias();
          this.cargarProductosOferta();
        });
      },
      error => {
        this.toastrService.error("Error: ", error);
      }
    );
  }

  /**
   * Permite actualizar una oferta en la BD.
   */
  modificarOferta() {
    this.agregarDiasToOferta();
    this.ofertaService.modificarOferta(this.oferta).subscribe(
      result => {
        this.toastrService.success("Oferta modificada correctamente");
        this.router.navigate(['ofertaGestion']);
      },
      error => {
        this.toastrService.error("Error:", error);
      }
    );
  }

  /**
   * Permite carga un vector de productos.
   */
  cargarProductosOferta() {
    this.productosOferta = new Array<Producto>();
    this.oferta.productos.forEach(id => {
      this.productoService.obtenerProducto(id).subscribe(
        result => {
          let prod: Producto = new Producto();
          result.forEach((element: any) => {
            Object.assign(prod, element);
            this.productosOferta.push(prod);
          });
        }
      );
    });
  }

  buscarPorNombreProducto() {
    if (this.searchProducto.trim() !== '') {
      const productosEncontrados = this.productos.filter(producto => producto.nombreProducto.toLowerCase().includes(this.searchProducto.toLowerCase()));
      this.productos = productosEncontrados;
    } else {
      this.cargarProductos();
    }
  }
}
