import { Controller, Post, Req, Res, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './Models/User.model';

@Controller('/user')
export class UserController {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  @Post('/login')
  async login(@Req() req, @Res() res) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: 'All fields are required' });
    }
    try {
      const user = await this.userModel.findOne({ email: email.trim() }).exec();
      if (!user) {
        return res.status(HttpStatus.NOT_FOUND).json({ message: 'User not found' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Invalid credentials' });
      }
      const token = jwt.sign(user.toJSON(), "helloworld", {
        expiresIn: '10d',
      });
      res.status(HttpStatus.OK).json({ message: 'Login successful', token: token });
    } catch (err) {
      console.log('Error during login:', err);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
  }
  @Post('/register')
    async register(@Req() req, @Res() res) {
      const {name, email, password } = req.body;
      if (!name || !email || !password) {
        return res.status(HttpStatus.BAD_REQUEST).json({ message: 'All fields are required' });
      }
      try {
        const existedUser=await this.userModel.findOne({ email: email.trim() }).exec();
        if (existedUser) {
          return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Email already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new this.userModel({name:name.trim(), email: email.trim(), password: hashedPassword });
        await user.save();
        res.status(HttpStatus.CREATED).json({ message: 'Registration successful' });
      } catch (err) {
        console.log('Error during registration:', err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
      }
    }
}
