import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User, UserDocument } from './user.model';

export type NoteDocument = Note & Document;

@Schema()
export class Note {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  message: string;

  @Prop({ type: 'ObjectId', ref: 'User' })
  user: UserDocument;

  @Prop({ default: Date.now }) 
  createdAt: Date;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
