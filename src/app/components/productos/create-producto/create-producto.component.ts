import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
import { ProductoService } from 'src/app/service/producto.service';

declare let jQuery:any;
declare let $:any;
declare var iziToast:any;

@Component({
  selector: 'app-create-producto',
  templateUrl: './create-producto.component.html',
  styleUrls: ['./create-producto.component.css']
})
export class CreateProductoComponent implements OnInit {

  public producto:any = {
    categorias: ''
  };
  public file: File = undefined!;
  public imgSelect : any | ArrayBuffer = 'assets/img/01.jpg';
  public config: any = {};
  public token:any;

  constructor(
    private _productoService : ProductoService,
    private _adminService : AdminService
  ) {
    this.config = {
      height: 500
    }
    this.token = this._adminService.getToken();
  }

  ngOnInit(): void {
  }

  registro(registroForm:any){
    //validar formulario
    if(registroForm.valid){
      console.log(this.producto);
      console.log(this.file);

      this._productoService.registo_producto_admin(this.producto,this.file,this.token).subscribe(
        response =>{
          console.log(response);
        },
        error =>{
          console.log(error);
        }
      )

    }else{
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        color: '#FFF',
        class:'text-danger',
        position: 'topRight',
        message: 'los datos no son validos'
      });
      $('#input-portada').text('Seleccionar imagen');
        this.imgSelect = 'assets/img/01.jpg';
        this.file = undefined!;
    }

  }
  fileChangeEvent(event:any):void{
    var file;

    if(event.target.files && event.target.files[0]){
      file = <File>event.target.files[0];

    }else{
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        color: '#FFF',
        class:'text-danger',
        position: 'topRight',
        message: 'No existe una imagen'
      });
      $('#input-portada').text('Seleccionar imagen');
        this.imgSelect = 'assets/img/01.jpg';
        this.file = undefined!;
    }
    //validar variable file tamaño
    if(file?.size! <= 400000){
      //asd
      if(file?.type == 'image/png' || file?.type == 'image/jpg'
      || file?.type == 'image/webp' || file?.type == 'image/gif'
      || file?.type == 'image/jpeg'){
        const reader = new FileReader();
        reader.onload = e => this.imgSelect = reader.result;
        console.log(this.imgSelect)
        reader.readAsDataURL(file);

        $('#input-portada').text(file.name);
        this.file = file;
      }else{
        iziToast.show({
          title: 'ERROR',
          titleColor: '#FF0000',
          color: '#FFF',
          class:'text-danger',
          position: 'topRight',
          message: 'El archivo debe ser una imagen'
        });
        $('#input-portada').text('Seleccionar imagen');
        this.imgSelect = 'assets/img/01.jpg';
        this.file = undefined!;
      }
    }else{
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        color: '#FFF',
        class:'text-danger',
        position: 'topRight',
        message: 'imagen no puede superar los 4MB'
      });
      $('#input-portada').text('Seleccionar imagen');
      this.imgSelect = 'assets/img/01.jpg';
      this.file = undefined!;
    }

    console.log(this.file);
  }

}
