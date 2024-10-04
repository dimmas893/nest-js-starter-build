import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserDao } from './user.dao';
import { User } from './user.model';
import { Profile } from '../profile/profile.model';
import { Comment } from '../comment/comment.model'; // Import Comment model

@Module({
  imports: [SequelizeModule.forFeature([User, Profile, Comment])], // Daftarkan Comment di sini
  controllers: [UserController],
  providers: [UserService, UserDao],
})
export class UserModule {}
