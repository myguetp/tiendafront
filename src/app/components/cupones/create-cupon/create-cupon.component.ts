import { Component, OnInit } from '@angular/core';
import { CuponService } from 'src/app/service/cupon.service';
declare var iziToast:any;

@Component({
  selector: 'app-create-cupon',
  templateUrl: './create-cupon.component.html',
  styleUrls: ['./create-cupon.component.css']
})
export class CreateCuponComponent implements OnInit {

  public token:any;
  public cupon : any = {
    tipo:''
  };
  public load_btn = false;

  constructor(
    private _cuponService: CuponService
  ) {
    this.token = localStorage.getItem('token');
   }

  ngOnInit(): void {
  }

  registro(registroForm:any){
    if(registroForm.valid){
      this._cuponService.registo_cupon_admin(this.cupon,this.token).subscribe(
        response =>{
          console.log(response);
        },
        error => {
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
    }
  }

}
