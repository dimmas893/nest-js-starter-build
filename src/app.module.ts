import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user/model/user.model'; // import entitas user
import { Profile } from './profile/profile.model'; // import entitas user
import { Comment } from './comment/comment.model'; // import entitas user
import { Post } from './post/post.model'; // import entitas user
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: process.env.DB_DIALECT as any,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10), 
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME_DEV,
      models: [User, Profile, Comment, Post],
      autoLoadModels: true,
      synchronize: false,
    }),    
    SequelizeModule.forFeature([User,Profile,Comment,Post]), 
    PostModule,
    UserModule
   ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
