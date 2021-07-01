import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Put,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/task.dto';
import { Task } from './interfaces/task';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Get()
  getTasks(): Promise<Task[]> {
    return this.taskService.getTasks();
  }

  @Get('/:id')
  getTask(@Param('id') id: string): Promise<Task> {
    return this.taskService.getTask(id);
  }

  @Post()
  createTask(@Body() task: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(task);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id) {
    console.log(id);
    return `success delete task ${id}`;
  }

  @Put('/:id')
  updateTask(@Body() task: CreateTaskDto, @Param('id') id) {
    console.log(task, id);
    return `success update task ${id}`;
  }
}
