import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Bodytask } from './dto/bodytask';
import { TaskService } from './service/task.service';
import { CustomValidators } from './util/custom-validators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  title = 'taskproyecto';


  private service: TaskService;

  submittedForm = true;

  datos: Bodytask[] = [];

  open = true;

  massaje="El campo es requerido";

  arrayCataegory=["Sistemas","Matematica"];



  time: string = "";

  timeEnd: string = "";

  dayCurrent: string = "";

  monthCurren: string = "";

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(15),CustomValidators.spaceValidator]),
    description: new FormControl('', [Validators.required,Validators.maxLength(100),CustomValidators.spaceValidator]),
    dateTask: new FormControl('', [Validators.required,CustomValidators.spaceValidator]),
    category: new FormControl('', [Validators.required,CustomValidators.spaceValidator]),
  });

  constructor(service: TaskService) {
    this.service = service;
  }

  ngOnInit(): void {
    this.getAllData();
    this.currentTime();

  }

  currentTime() {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    if (month < 10) {
      this.monthCurren = `0${month}`;
      if (day < 10) {
        this.dayCurrent = `0${day}`;
      } else {
        this.dayCurrent = `${day}`;
      }
    } else {
      this.monthCurren = `${month}`;
      if (day < 10) {
        this.dayCurrent = `0${day}`;
      } else {
        this.dayCurrent = `${day}`;
      }
    }
    this.time = `${year}-${this.monthCurren}-${this.dayCurrent}`;

  }
  getAllData() {
    this.service.notifier$.subscribe((val)=>{
      if(val){
        this.datos = this.service.getDataAll();
      }

    })
    this.datos = this.service.getDataAll();
  }

  filterTasks(event: Event) {
 (<HTMLSelectElement>event.target).value;
    if ((<HTMLSelectElement>event.target).value !=="Todas") {
   this.datos=this.service.filterTask((<HTMLSelectElement>event.target).value);
    } else {
      this.getAllData();
    }

  }

  findTasks(buscarbyName: string) {
    this.datos=this.service.dynamicSearch(buscarbyName);

  }

  saveTask(){
    this.submittedForm =  false;

    if (!this.form.invalid){
      this.service.saveTask(
        this.form.controls['name'].value.trim(),
        this.form.controls['description'].value.trim(),
        this.form.controls['category'].value,
        this.form.controls['dateTask'].value,
        );
        this.resetForm();
    }

  }



  resetForm(){
    this.form.reset();
    this.submittedForm =  true;

  }

  emitirIdTask(id:number){
    this.service.dbId(id.toString());

  }
}
