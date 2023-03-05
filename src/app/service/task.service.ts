import { Injectable, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import Swal from 'sweetalert2';

import { Bodytask } from '../dto/bodytask';


@Injectable({
  providedIn: 'root'
})

export class TaskService {
  @Output()
  communicationBetweenComponents = new EventEmitter();

  private notifier = new BehaviorSubject<boolean>(false);
  notifier$ = this.notifier.asObservable();

  private e = new BehaviorSubject<boolean>(false);
  e$ = this.notifier.asObservable();

  private bdTask: Bodytask[] = [];
  private filterTasksByParameter: Bodytask[] = [];
  private arrayDynamicSearch: Bodytask[] = [];

  private forDelete: Bodytask[] = [];





  constructor() { }


  public getDataAll(): Bodytask[] {
    if (localStorage.getItem('task')?.includes("task")) {
      return JSON.parse(localStorage.getItem('informationTask') || "");
    } else {
      return [];
    }


  }


  public saveTask(name: string, description: string, category: string, dateTask: Date) {
    this.bdTask = this.getDataAll();
    let idvalor = this.bdTask.length;

    if (idvalor > 0) {
      idvalor = this.bdTask[idvalor - 1].id + 1;
    }


    this.bdTask.push(new Bodytask(idvalor, name, description, false, category, dateTask));
    localStorage.setItem('informationTask', JSON.stringify(this.bdTask));
    localStorage.setItem('task', 'task');
    this.notifier.next(true);
    Swal.fire(
      'Información!',
      'La tarea se guardo con exito!',
      'success'
    )

  }



  filterTask(paramterCategory: string): Bodytask[] {
    this.filterTasksByParameter = [];
    this.bdTask = this.getDataAll();

    this.bdTask.forEach(data => {
      if (data.category === paramterCategory) {
        this.filterTasksByParameter.push(data);
      }
    })
    return this.filterTasksByParameter;

  }

  dynamicSearch(word: string): Bodytask[] {
    this.arrayDynamicSearch = [];
    this.bdTask = this.getDataAll();
    this.bdTask.forEach(data => {
      if (data.name.includes(word)) {
        this.arrayDynamicSearch.push(data);
      }
    })
    return this.arrayDynamicSearch;


  }

  dbId(id: string) {
    localStorage.setItem("idDeleteTask", id);
  }

  returnId() {
    localStorage.getItem("idDeleteTask");
    return Number(localStorage.getItem("idDeleteTask"));
  }

  deleteTask(id: number) {
    let borrado = false;
    let tarea;
    this.forDelete = [];
    this.bdTask = this.getDataAll();
    this.bdTask.forEach(data => {
      if (data.id !== id) {
        this.forDelete.push(data);

      } else {
        borrado = true;
        tarea = data.name;
      }
    })
    this.bdTask = [];
    localStorage.setItem('informationTask', JSON.stringify(this.forDelete));
    if (borrado) {
      this.notifier.next(true);

      Swal.fire(
        'Borrado!',
        `La tarea ${tarea} se borro con exito`,
        'success'
      )
    }


  }

  endTask(id: number) {
    let update = false;
    let tarea;
    this.forDelete = [];
    this.bdTask = this.getDataAll();
    this.bdTask.forEach(data => {
      if (data.id !== id) {
        this.forDelete.push(data);

      } else {
        let end = false;
        if (!data.state){
          end = true;
        }
        const infUpdate =  new Bodytask(data.id, data.name, data.description,end,data.category, data.dateTask);
        this.forDelete.push(infUpdate);
        update = true;
        tarea = data.name;
      }
    })
    this.bdTask = [];
    localStorage.setItem('informationTask', JSON.stringify(this.forDelete));
    if (update) {
      this.notifier.next(true);

      Swal.fire(
        'Autilizada!',
        `La tarea ${tarea} se actualizo con exito`,
        'success'
      )
    }


  }


}
