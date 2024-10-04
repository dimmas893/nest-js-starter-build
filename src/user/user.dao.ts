import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { Profile } from '../profile/profile.model';
import { Post } from '../post/post.model';
import { Comment } from '../comment/comment.model';
import { Sequelize } from 'sequelize-typescript';
import { UserQueryDto } from './user.dto'; // Import DTO
import { Op } from 'sequelize'; // Import untuk operator pencarian

export class UserDao {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    @InjectModel(Profile) private readonly profileModel: typeof Profile,
    private readonly sequelize: Sequelize, // Pastikan Sequelize di-inject
  ) {}

  async getUsersWithProfiles(): Promise<User[]> {
    return this.userModel.findAll({
      attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
      include: [
        {
          model: Profile,
          as: 'userProfiles',
          attributes: ['id', 'bio', 'createdAt', 'updatedAt'],
          required: false,
        },
      ],
    });
  }

  async getUsersWithPost(): Promise<User[]> {
    return this.userModel.findAll({
      attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
      include: [
        {
          model: Post,
          as: 'posts',
          attributes: ['id', 'title', 'content'],
          required: false,
        },
      ],
    });
  }

  async getUsersWithProfileAndComments(): Promise<User[]> {
    return this.userModel.findAll({
      include: [
        {
          model: Profile,
          attributes: ['bio'],
        },
        {
          model: Comment,
          as: 'userComments',
          attributes: ['content'],
        },
      ],
    });
  }

  async getUsersWithProfile(): Promise<User[]> {
    return this.userModel.findAll({
      include: [
        {
          model: Profile,
          required: false,
        },
      ],
    });
  }

  async getAllUsers(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async getProfilesWithUsers(): Promise<Profile[]> {
    return this.profileModel.findAll({
      include: [
        {
          model: User,
          required: true,
        },
      ],
    });
  }

  // Implementasi paginasi
  async getUsersWithPagination(query: UserQueryDto): Promise<any> {
    const page = parseInt(query.page as any, 10) || 1; // Konversi page ke integer, default ke 1 jika tidak ada
    const limit = parseInt(query.limit as any, 10) || 10; // Konversi limit ke integer, default ke 10 jika tidak ada
    const offset = (page - 1) * limit;
  
    const whereClause = query.search
      ? {
          [Op.or]: [
            { name: { [Op.iLike]: `%${query.search}%` } },
            { email: { [Op.iLike]: `%${query.search}%` } },
          ],
        }
      : {};
  
    const users = await this.userModel.findAndCountAll({
      where: whereClause,
      limit: limit,
      offset: offset,
      order: [['name', 'ASC']],
    });
  
    return {
      totalRows: limit,
      page: page, // Pastikan page disimpan sebagai integer
      // totalPages: Math.ceil(users.count / limit),
      rows: users.rows,
    };
  }
  
}
