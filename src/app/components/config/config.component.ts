import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { v4 as uuidv4 } from 'uuid';
import { GLOBAL } from 'src/app/service/GLOBAL';
declare var iziToast:any;
declare let jQuery:any;
declare let $:any;


@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  public token: any;
  public config : any = {};
  public url:any;

  public imgSelect? :  String | ArrayBuffer | null;

  public titulo_cat = '';
  public icono_cat = '';

  public file:File=undefined!;

  constructor(
    private _adminService: AdminService
    ) {
      this.token = localStorage.getItem('token');
      //img inicializacion
      this.url = GLOBAL.url;

      this._adminService.obtener_config_admin(this.token).subscribe(
        response =>{
          //console.log(response);
          this.config = response.data;
          this.imgSelect = this.url+'obtener_logo/'+this.config.logo;
          console.log(this.config);
        },
        error =>{
          console.log(error);
        }
      );
    }

  ngOnInit(): void {
  }

  agregar_cat(){
    if(this.titulo_cat && this.icono_cat){
      console.log(uuidv4());

      this.config.categorias.push({
        titulo: this.titulo_cat,
        icono: this.icono_cat,
        _id: uuidv4()
      });

      this.titulo_cat = '';
      this.icono_cat = '';
    }else{
      iziToast.show({
        title:'ERROR',
        titleColor:'#FF0000',
        class:'text-danger',
        position: 'topRight',
        message: 'Ingrese titulo e icono para la categoria'
      });
    }
  }
  actualizar(confForm:any){
    if(confForm.valid){
      let data = {
        titulo:confForm.value.titulo,
        serie:confForm.value.serie,
        correlativo:confForm.value.correlativo,
        categorias: this.config.categorias,
        logo: this.file
      }

      console.log(data);

      this._adminService.actualiza_cofig_admin("62dc988ed3b4e573fd119652",data,this.token).subscribe(
        response =>{
          iziToast.show({
            title: 'SUCCESS',
            titleColor: '#FF0000',
            color: '#1DC74C',
            class:'text-success',
            position: 'topRight',
            message: 'se actualizo correctamente la configuración.'
          });

        }
      );

    }else{
      iziToast.show({
        title:'ERROR',
        titleColor:'#FF0000',
        class:'text-danger',
        position: 'topRight',
        message: 'Complete correctamente el formulario'
      });
    }
  }

  fileChangeEvent(event:any){
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
        $('.cs-file-drop-icon').addClass('cs-file-drop-preview img-thumbnail rounded');
        $('.cs-file-drop-icon').removeClass('cs-file-drop-icon cxi-upload');
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

  ngDoCheck(): void {
    $('.cs-file-drop-preview').html("<img src="+this.imgSelect+">");
  }

  eliminar_categoria(idx:any){
    this.config.categorias.splice(idx,1);
  }

}
