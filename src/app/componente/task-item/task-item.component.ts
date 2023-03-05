import { Component, OnInit } from '@angular/core';

import { TaskService } from 'src/app/service/task.service';

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




}
