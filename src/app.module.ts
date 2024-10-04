import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user/user.model'; // import entitas user
import { Profile } from './profile/profile.model'; // import entitas user
import { Comment } from './comment/comment.model'; // import entitas user
import { Post } from './post/post.model'; // import entitas user
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';
@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres', // ganti sesuai dengan database yang kamu pakai
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: 'Anandadimmas,123',
      database: 'nest',
      models: [User,Profile,Comment,Post], // daftar model yang digunakan
      autoLoadModels: true, // untuk memuat model secara otomatis
      synchronize: false, // aktifkan sinkronisasi untuk development (jangan aktifkan di production)
    }),
    SequelizeModule.forFeature([User,Profile,Comment,Post]), // daftarkan model User
    PostModule,
    UserModule
   ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
