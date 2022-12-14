import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Todo } from 'src/app/models/todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-read-all',
  templateUrl: './read-all.component.html',
  styleUrls: ['./read-all.component.css']
})
export class ReadAllComponent implements OnInit {

  closed = 0;
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
        } else {
          this.list.push(todo);
        }
      })
      this.closed = this.listFinished.length;
    })
  }

  finished(item: Todo): void {
    item.finished = true;
    this.service.update(item).subscribe((answer) => {
      this.service.message('Task finished successfully');
      this.list = this.list.filter(todo => todo.id !== item.id);
      this.closed++;
    })
  }

  delete(id: any):void {
    this.service.delete(id).subscribe((answer) => {
      if(answer === null) {
        this.service.message('Task deleted successfully');
        this.list = this.list.filter(todo => todo.id !== id);
      }
    })
  }

  finishedTasks(): void {
    this.router.navigate(['finished']);
  }

}
