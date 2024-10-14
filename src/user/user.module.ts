import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { UserDao } from './dao/user.dao';
import { User } from './model/user.model';
import { Profile } from '../profile/profile.model';
import { Comment } from '../comment/comment.model';

@Module({
  imports: [SequelizeModule.forFeature([User, Profile, Comment])],
  controllers: [UserController],
  providers: [UserService, UserDao],
})
export class UserModule {}
