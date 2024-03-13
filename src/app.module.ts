import { Module, NestModule, MiddlewareConsumer  } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './users.controller';
import { User, UserSchema } from './Models/User.model'; 
import {NoteController} from "./Controller/Notes.controller"
import { Note, NoteSchema } from './Models/Notes.model'
import {AuthMiddleware} from "./Middleware/Auth.middleware"
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    MongooseModule.forRoot(`${process.env.DB_URI}`),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Note.name, schema: NoteSchema }]), 
  ],
  controllers: [UserController,NoteController],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes("/notes");
  }
}
