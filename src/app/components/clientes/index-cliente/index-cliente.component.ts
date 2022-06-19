import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
import { ClienteService } from '../../../service/cliente.service';

@Component({
  selector: 'app-index-cliente',
  templateUrl: './index-cliente.component.html',
  styleUrls: ['./index-cliente.component.css']
})
export class IndexClienteComponent implements OnInit {

  public clientes : Array<any> = [];
  public filtro_apellidos = '';
  public filtro_correo = '';

  public page = 1;
  public pageSize = 20;
  public token:any;

  constructor(
    private _clienteService : ClienteService,
    private _adminService: AdminService
  ) {
    this.token = this._adminService.getToken();
  }

  ngOnInit(): void {
   this.init_Data();
  }

  init_Data(){
    this._clienteService.listar_clientes_filtro_admin(null,null,this.token).subscribe(
      response=>{

        this.clientes = response.data;

      },
      error=>{
        console.log(error);
      }
    );
  }

  filtro(tipo:string){

    if(tipo == 'apellidos'){
    if(this.filtro_apellidos){
      this._clienteService.listar_clientes_filtro_admin(tipo,this.filtro_apellidos,this.token).subscribe(
        response=>{

          this.clientes = response.data;

        },
        error=>{
          console.log(error);
        }
      );

    }else{
      this.init_Data();
    }
    }else if(tipo == 'correo'){
      if(this.filtro_apellidos){
      this._clienteService.listar_clientes_filtro_admin(tipo,this.filtro_correo,this.token).subscribe(
        response=>{

          this.clientes = response.data;

        },
        error=>{
          console.log(error);
        }
      );
    }else{
      this.init_Data();
    }
  }

  }

}
