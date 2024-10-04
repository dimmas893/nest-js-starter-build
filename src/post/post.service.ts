import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './post.model';
import { Comment } from '../comment/comment.model';
import { User } from '../user/user.model';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post)
    private readonly postModel: typeof Post
  ) {}

  // INNER JOIN: Get posts with related user and comments
  async findPostsWithUserAndComments(): Promise<Post[]> {
    return this.postModel.findAll({
      include: [
        {
          model: User, // Relasi dengan user
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Comment, // Relasi dengan comments
          attributes: ['id', 'content'],
        },
      ],
    });
  }

  // LEFT JOIN: Get users and their posts (if any)
  async findUsersWithPosts(): Promise<any> {
    return User.findAll({
      include: [
        {
          model: Post,
          required: false, // LEFT JOIN
          attributes: ['id', 'title', 'content'],
        },
      ],
    });
  }

  // RIGHT JOIN: Get posts and the related user
  async findPostsWithUsersRightJoin(): Promise<Post[]> {
    return this.postModel.findAll({
      include: [
        {
          model: User,
          required: true, // RIGHT JOIN akan menggunakan INNER JOIN di Sequelize
          attributes: ['id', 'name', 'email'],
        },
      ],
    });
  }
}
