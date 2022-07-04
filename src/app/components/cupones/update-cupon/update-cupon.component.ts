import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CuponService } from 'src/app/service/cupon.service';
declare var iziToast:any;

@Component({
  selector: 'app-update-cupon',
  templateUrl: './update-cupon.component.html',
  styleUrls: ['./update-cupon.component.css']
})
export class UpdateCuponComponent implements OnInit {

  public token:any;
  public cupon : any = {
    tipo:''
  };
  public load_btn = false;
  public id:any;
  public load_data = true;

  constructor(
    private _cuponService: CuponService,
    private _router:Router,
    private _route:ActivatedRoute,
  ) {
    this.token = localStorage.getItem('token');
  }

  ngOnInit(): void {
    this. _route.params.subscribe(
      params =>{
        this.id = params['id'];
        console.log(this.id)

        this._cuponService.obtener_cupon_admin(this.id,this.token).subscribe(
          response=>{
            if(response.data == undefined){
              this.cupon = undefined
              this.load_data = false;
            }else{
              this.cupon = response.data;
              this.load_data = false;
            }
            console.log(this.cupon)
          }
        )
      }
    )
  }

  actualizar(actualizarForm:any){
    if(actualizarForm.valid){
      this.load_btn = true;
      this._cuponService.actualizar_cupon_admin(this.id, this.cupon, this.token).subscribe(
        response=>{
          //console.log(response);
          iziToast.show({
            title: 'SUCCESS',
            titleColor: '#FF0000',
            color: '#1DC74C',
            class:'text-success',
            position: 'topRight',
            message: 'se actualizo correctamente nuevo cupón.'
          });
          this.load_btn = false;
          //redirección
          this._router.navigate(['/panel/cupones'])
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
    }
  }

}
