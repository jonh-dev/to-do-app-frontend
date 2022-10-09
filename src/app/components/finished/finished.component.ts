import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Todo } from 'src/app/models/todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-finished',
  templateUrl: './finished.component.html',
  styleUrls: ['./finished.component.css']
})
export class FinishedComponent implements OnInit {

  list: Todo[] = [];
  listFinished: Todo[] = [];

  constructor(private service: TodoService, private router: Router) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.service.findAll().subscribe((answer) => {
      answer.forEach(todo => {
        if(todo.finished) {
          this.listFinished.push(todo);
        }
      })
    })
  }

  delete(id: any):void {
    this.service.delete(id).subscribe((answer) => {
      if(answer === null) {
        this.service.message('Task deleted successfully')
        this.list = this.list.filter(todo => todo.id !== id);
      }
    })
  }

  back(): void {
    this.router.navigate([''])
  }

}
