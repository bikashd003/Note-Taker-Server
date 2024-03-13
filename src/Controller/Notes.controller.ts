import { Controller, Post, Req, Res, HttpStatus, Get,Delete, Put } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Note, NoteDocument } from '../Models/Notes.model';

@Controller('/notes')
export class NoteController {
  constructor(
    @InjectModel(Note.name) private readonly noteModel: Model<NoteDocument>,
  ) {}

  @Post('/create')
  async create(@Req() req, @Res() res) {
    const { title, message } = req.body;
    if (!title || !message) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Please provide title and message' });
    }
    try {
      const user = req.user._id;
      const note = new this.noteModel({ title, message, user });
      await note.save();
      res
        .status(HttpStatus.CREATED)
        .json({ message: 'Note created successfully' });
    } catch (err) {
      console.log(err);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal server error' });
    }
  }
  @Get("/get-notes")
    async getNote(@Req() req, @Res() res) {
      try {
        const user = req.user._id;
        const notes = await this.noteModel.find({ user }).exec();
        res.status(HttpStatus.OK).send(notes);
      } catch (err) {
        console.log(err);
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: 'Internal server error' });
      }
    }
    @Delete("/delete/:id")
    async deleteNote(@Req() req, @Res() res) {
      try {
        const note = await this.noteModel.findByIdAndDelete(req.params.id);
        if (!note) {
          return res
            .status(HttpStatus.NOT_FOUND)
            .json({ message: 'Note not found' });
        }
        res.status(HttpStatus.OK).json({ message: 'Note deleted successfully' });
      } catch (err) {
        console.log(err);
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: 'Internal server error' });
      }
    }
    @Put("/update/:id")
    async updateNote(@Req() req, @Res() res) {
      try {
        const { title, message } = req.body;
        const note = await this.noteModel.findByIdAndUpdate(
          req.params.id,
          { title, message },
          { new: true }
        );
        if (!note) {
          return res
            .status(HttpStatus.NOT_FOUND)
            .json({ message: 'Note not found' });
        }
        res.status(HttpStatus.OK).json({ message: 'Note updated successfully' });
      } catch (err) {
        console.log(err);
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: 'Internal server error' });
      }
    }
}
