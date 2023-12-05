import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ChartConfiguration, ChartOptions, ChartType } from "chart.js";
import { error } from 'console';
import { CalificacionService } from 'src/app/services/calificacion.service';
import { VentaService } from 'src/app/services/venta.service';


@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {
  //propiedades del bar y pie chart
  grafico!: string;
  resumen: Array<any> = [0, 0, 0, 0, 0];
  mostrar = false;
  categorias = ['Muy malo', 'Malo', 'Regular', 'Muy bueno', 'Excelente'];
  fechaDesde: string = "";
  fechaHasta: string = "";
  filtro!: boolean;

  dataProductos: number[] = [];
  dataCliente:number[]=[];
  //Propiedades del barChart
  public barChartLegend = true;
  public barChartPlugins = [];
  barChartType = 'horizontalBar';
  public barChartData!: ChartConfiguration<'bar'>['data'];
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    scales: {
      x: {
        ticks: {
          color: 'white', // Color de las etiquetas del eje x
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)', // Color de las líneas de la cuadrícula del eje x
        },
      },
      y: {
        ticks: {
          color: 'white', // Color de las etiquetas del eje y
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)', // Color de las líneas de la cuadrícula del eje y
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: 'white', // Color de las etiquetas de la leyenda
        },
      },
    }
  };




  public barChartColors: any[] = [
    {
      backgroundColor: 'rgba(255, 0, 0, 0.5)', // Cambiar el fondo del gráfico de barras
    }
  ];

  //   //Propiedades del pieChart
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    elements: {
      arc: {
        backgroundColor: [
          'rgba(255, 165, 0, 0.8)',
          'rgba(144, 238, 144, 0.8)',
          'rgba(135, 206, 250, 0.8)',
          'rgba(255, 255, 0, 0.8)',
          'rgba(255, 105, 180, 0.8)'
        ],
      },
    },
    plugins: {
      legend: {
        labels: {
          color: 'white', // Color de las etiquetas de la leyenda
        },
      },
    }
  };

  public pieChartLabels = this.categorias;
  public pieChartDatasets = [{
    data: this.resumen
  }]
  public pieChartLegend = true;
  public pieChartPlugins = [];
  mesProducto: number = 13;
  mostrarLine = false;
  mostrarCliente = false;
  filtroProductoVendidos = false;
  filtroCliente = false;
  mesCliente: number = 13;
  labelMesCliente!:number; 
  labelMesProducto!:number; 
  //tabla 
  tabla!: Array<any>;
  datosVentas = { labels: [" ", " "], datos: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]}

  

  //Line Chart 
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre"
    ],
    datasets: [
      {
        data: [62, 59, 80, 81, 56, 55, 40],
        label: 'Ventas',
        fill: true,
        tension: 0.5,
        borderColor: 'rgba(52, 166, 59, 1)',
        backgroundColor: 'rgba(52, 166, 59, 0.8)',
        pointBackgroundColor :'rgba(52, 166, 59, 1)'
      }
    ]
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    scales: {
      x: {
        ticks: {
          color: 'white', // Color de las etiquetas del eje x
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)', // Color de las líneas de la cuadrícula del eje x
        },
      },
      y: {
        ticks: {
          color: 'white', // Color de las etiquetas del eje y
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)', // Color de las líneas de la cuadrícula del eje y
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: 'white', // Color de las etiquetas de la leyenda
        },
      },
    }
  };
  

  public lineChartLegend = true;





  constructor(private calificacionService: CalificacionService,
    private webTitle: Title,
    private ventaService: VentaService) {
    this.webTitle.setTitle("Birabar - Reportes");
  }

  ngOnInit(): void {
    this.grafico = "barra";
    this.cargarResumenTotal();
    this.cargarDatosVentas();
    this.cargarDatosResumenProducto();
    this.cargarDatosResumenCliente();

  }
  cambio(valor: any) {
    this.grafico = valor.target.value;
  }

  cambiarMesProductos(valor: any) {
    this.mesProducto = valor.target.value;
    console.log(this.mesProducto);
  }
  cambiarMesCliente(valor: any) {
    this.mesCliente = valor.target.value;
    console.log(this.mesProducto);
  }
  cargarResumenTotal() {
    this.calificacionService.obtenerResumen().subscribe(
      result => {
        this.resumen = [0, 0, 0, 0, 0];
        if(result.length==0)
        this.resumen=[];
        result.forEach((element: any) => {
          this.resumen[element.puntaje - 1] = element.count;
        });

        this.barChartData = {
          labels: this.categorias,
          datasets: [
            { data: this.resumen, label: 'Calificaciones', backgroundColor: "rgba(255, 211, 0, 0.8)" , hoverBackgroundColor: "rgba(255, 211, 0, 1)"},
          ]

        };
        this.pieChartDatasets = [{
          data: this.resumen
        }]



        this.mostrar = true;
      },
      error => {

      }
    )

  }


  filtrar() {
    let fechaDesdeDate = new Date(this.fechaDesde);
    fechaDesdeDate.setHours(24);
    let fechaHastaDate = new Date(this.fechaHasta);
    fechaHastaDate.setHours(24);
    let desde = fechaDesdeDate.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
    let hasta = fechaHastaDate.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
    console.log(desde + " " + hasta);

    
    this.calificacionService.obtenerResumenPorFecha(desde, hasta).subscribe(
      result => {
        this.filtro = true;
        this.mostrar = false;
        this.resumen = [0, 0, 0, 0, 0];
        if(result.length==0)
        this.resumen=[];
        console.log("resumen " + result)
        result.forEach((element: any) => {
          console.log(element)
          this.resumen[element.puntaje - 1] = element.count;
        });

        this.barChartData = {
          labels: this.categorias,
          datasets: [
            { data: this.resumen, label: 'Calificaciones' },
          ]
        };

        this.pieChartDatasets = [{
          data: this.resumen
        }]



        this.mostrar = true;
      },
      error => {
        this.filtro = false;
        this.cargarResumenTotal();
      }
    )


  }

  limpiarFiltro() {
    this.cargarResumenTotal();
    this.fechaDesde = "";
    this.fechaHasta = "";
    this.filtro = false;
  }

  cargarDatosVentas() {
    let meses = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre"
    ];

    this.ventaService.getVentasResumen().subscribe(
      result => {
        this.datosVentas.labels = meses.slice(0, result[result.length - 1]._id);
        console.log(this.datosVentas.labels);
        result.forEach((element: any, index: number) => {

          this.datosVentas.datos[element._id - 1] = element.cantidad;

        })
        console.log(this.datosVentas.datos);

        this.lineChartData.labels = this.datosVentas.labels;
        this.lineChartData.datasets[0].data = this.datosVentas.datos;
        this.mostrarLine = true;
      },
      error => {

      }

    )
  }


  //Reporte Horizontal

  public barChartLegend2 = true;
  public barChartPlugins2 = [];

  public barChartData2!: ChartConfiguration<'bar'>['data'];
  public barChartOptions2: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    indexAxis: 'y', 
    scales: {
      x: {
        ticks: {
          color: 'white', // Color de las etiquetas del eje x
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)', // Color de las líneas de la cuadrícula del eje x
        },
      },
      y: {
        ticks: {
          color: 'white', // Color de las etiquetas del eje y
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)', // Color de las líneas de la cuadrícula del eje y
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: 'white', // Color de las etiquetas de la leyenda
        },
      },
    }
    // Agregar esta línea para mostrar barras horizontales
  };


  cargarDatosResumenProducto() {
    let labels: string[] = [];
    this.dataProductos = [];
    this.ventaService.getVentasProductoResumen(this.mesProducto).subscribe(
      result => {

        result.forEach((element: any) => {
          labels.push(element.nombre);
         this.dataProductos.push(element.cantidad);
        })

        if (this.mesProducto != 13) {
          this.filtroProductoVendidos = true;
        }

        this.barChartData2 = {
          labels: labels,
          datasets: [
            { data: this.dataProductos, label: 'Productos Vendidos', backgroundColor:"rgba(21, 155, 217, 0.8)" , hoverBackgroundColor: "rgba(21, 155, 217, 1)"},
          ]
        }
       this.labelMesProducto = this.mesProducto;
      },
      error => {

      }
    )
  }

  //Reporte Horizontal2

  public barChartLegend3 = true;
  public barChartPlugins3 = [];

  public barChartData3!: ChartConfiguration<'bar'>['data'];
  public barChartOptions3: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    indexAxis: 'y', // Agregar esta línea para mostrar barras horizontales
    scales: {
      x: {
        ticks: {
          color: 'white', // Color de las etiquetas del eje x
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)', // Color de las líneas de la cuadrícula del eje x
        },
      },
      y: {
        ticks: {
          color: 'white', // Color de las etiquetas del eje y
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)', // Color de las líneas de la cuadrícula del eje y
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: 'white', // Color de las etiquetas de la leyenda
        },
      },
    }
  };


  cargarDatosResumenCliente() {
    let labels: string[] = [];
     this.dataCliente = [];
    this.tabla = [];
    this.ventaService.getVentasClienteResumen(this.mesCliente).subscribe(
      result => {

        result.forEach((element: any) => {
          labels.push(element.cliente.usuario);
          this.dataCliente.push(element.totalCompras);
          this.tabla.push(element);
        })

        this.barChartData3 = {
          labels: labels,
          datasets: [
            { data: this.dataCliente, label: 'Clientes con compras', backgroundColor: "rgba(255, 211, 0, 0.8)" , hoverBackgroundColor: "rgba(255, 211, 0, 1)" },
          ]
        }
       
        this.mostrarCliente = true;
        if (this.mesCliente != 13)
          this.filtroCliente = true
      
          this.labelMesCliente = this.mesCliente;
      

      },
      error => {

      }
    )
  }

}
