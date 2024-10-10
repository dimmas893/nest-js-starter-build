import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserDao } from './user.dao';
import { User } from './user.model';
import { Profile } from '../profile/profile.model';
import { Comment } from '../comment/comment.model';

@Module({
  imports: [SequelizeModule.forFeature([User, Profile, Comment])],
  controllers: [UserController],
  providers: [UserService, UserDao],
})
export class UserModule {}
