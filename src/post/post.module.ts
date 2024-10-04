import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { Post } from './post.model';
import { Comment } from '../comment/comment.model';
import { User } from '../user/user.model';

@Module({
  imports: [SequelizeModule.forFeature([Post, Comment, User])],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
