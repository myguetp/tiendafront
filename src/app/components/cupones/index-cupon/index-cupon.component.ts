import { Component, OnInit } from '@angular/core';
import { CuponService } from 'src/app/service/cupon.service';
declare var iziToast:any;
declare let jQuery:any;
declare let $:any;

@Component({
  selector: 'app-index-cupon',
  templateUrl: './index-cupon.component.html',
  styleUrls: ['./index-cupon.component.css']
})
export class IndexCuponComponent implements OnInit {

  public cupones: Array<any> = [];
  public load_data = true;
  public page = 1;
  public pageSize = 20;
  public filtro = "";
  public token:any;

  constructor(
    private _cuponService: CuponService
  ) {
    this.token = localStorage.getItem('token')
   }

  ngOnInit(): void {
    this._cuponService.listar_cupones_admin(this.filtro,this.token).subscribe(
      response =>{
        //console.log(response);
        //lo guardamso en la variable
        this.cupones = response.data
        this.load_data = false;
      }
    )
  }

  filtrar(){
    this._cuponService.listar_cupones_admin(this.filtro,this.token).subscribe(
      response =>{
        //console.log(response);
        //lo guardamso en la variable
        this.cupones = response.data
        this.load_data = false;
      }
    )
  }

  eliminar(id:any){
    this._cuponService.eliminar_cupon_admin(id,this.token).subscribe(
      response =>{
        iziToast.show({
          title: 'SUCCESS',
          titleColor: '#FF0000',
          color: '#1DC74C',
          class:'text-success',
          position: 'topRight',
          message: 'se elimino correctamente cupon.'
        });

        $('#delete-'+id).modal('hide');
        $('.modal-backdrop').removeClass('show');

        this._cuponService.listar_cupones_admin(this.filtro,this.token).subscribe(
          response =>{
            this.cupones = response.data
            this.load_data = false;
          }
        )
      },
      error=>{
        console.log(error);
      }
    )
  }
}
