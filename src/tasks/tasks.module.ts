import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TaskSchema } from './schemas/task.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Task', schema: TaskSchema }])],
  exports: [],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
