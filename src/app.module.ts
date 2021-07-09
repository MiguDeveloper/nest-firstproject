import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    TasksModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development'],
    }),
    MongooseModule.forRoot(process.env.DATABASE_CONNECTION),
    ScheduleModule.forRoot(),
    ProductModule,
    UsersModule,
    AuthModule,
  ],
  exports: [ConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
