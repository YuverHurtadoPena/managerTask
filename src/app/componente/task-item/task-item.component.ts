import { Component, OnInit } from '@angular/core';

import { TaskService } from 'src/app/service/task.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {
  private service:TaskService;

  constructor(service:TaskService) {
    this.service = service;
  }

  ngOnInit(){

  }
delete(){
  let id = this.service.returnId();
  this.service.deleteTask(id);
}
endTask(){
  let id = this.service.returnId();
  this.service.endTask(id);
}


managerTask(){
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-danger',
      cancelButton: 'btn btn-success'
    },
    buttonsStyling: false
  })

  swalWithBootstrapButtons.fire({
    title: 'Gestion Tarea',
    html:`El boton <u>Eliminar</u>, borra la tarea irreversiblemente.<br>El boton <u> Estado</u> actualiza el estado de la tarea` ,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Eliminar!',
    cancelButtonText: 'Estado!',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
     this.delete();
    } else if (
      result.dismiss === Swal.DismissReason.cancel
    ) {
      this.endTask();
    }
  })
}


}
