export class Bodytask {
  id: number;
  name: string;
  description:string;
  category:string;
  state:boolean;
  dateTask:Date;

  constructor(id:number,name:string,description:string, state:boolean, category:string, dateTask:Date) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.state =  state;
    this.category = category;
    this.dateTask = dateTask;
  }
}
