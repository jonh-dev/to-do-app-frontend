import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from 'src/app/models/todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  todo: Todo = {
    title: '',
    description: '',
    dateToFinish: new Date(),
    finished: false
  }
  currentDate = new Date();

  constructor(private service: TodoService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.todo.id = this.route.snapshot.paramMap.get("id")!;
    this.findById();
  }

  onSubmit(form: any) {
    
  }

  findById(): void {
    this.service.findById(this.todo.id).subscribe((answer) => {
      this.todo = answer;
    })
  }

  create(): void {
    this.dateFormat();
    this.service.create(this.todo).subscribe((answer) => {
      this.service.message('To-do created successfully');
      this.router.navigate(['']);
    }, err => {
      this.service.message('Failed to create to-do');
      this.router.navigate(['']);
    })
  }

  update(): void {
    this.dateFormat();
    this.service.update(this.todo).subscribe((answer) => {
      this.service.message('Task updated successfully');
      this.router.navigate(['']);
    }, err => {
      this.service.message('Failed to update task');
      this.router.navigate(['']);
    })
  }

  cancel(): void {
    this.router.navigate([''])
  }

  dateFormat(): void {
    let data = new Date(this.todo.dateToFinish);
    this.todo.dateToFinish = `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`
  }

  validateData(d: any) {
    var data = d.value; // pega o valor do input
    data = data.replace(/\//g, "-"); // substitui eventuais barras (ex. IE) "/" por hífen "-"
    var data_array = data.split("-"); // quebra a data em array
    var dia = data_array[2];
    var mes = data_array[1];
    var ano = data_array[0];
 
    // para o IE onde será inserido no formato dd/MM/yyyy
    if(data_array[0].length != 4){
       dia = data_array[0];
       mes = data_array[1];
       ano = data_array[2];
    }
 
    var hoje = new Date();
    var d1 = hoje.getDate();
    var m1 = hoje.getMonth()+1;
    var a1 = hoje.getFullYear();
 
    var date1 = new Date(a1, m1, d1);
    var date2 = new Date(ano, mes, dia);
 
    var diff = date2.getTime() - date1.getTime();
    diff = diff / (1000 * 60 * 60 * 24);
    
    if(diff < 0){
       console.log("Data não pode ser anterior ao dia de hoje!");
    }else if(diff > 30){
       console.log("Data não pode ser mais do que 30 dias pra frente!");
    }else{
       console.log("Data válida!");
    }
  }

}
