import { InjectModel } from '@nestjs/sequelize';
import { User } from '../model/user.model';
import { Profile } from '../../profile/profile.model';
import { Sequelize } from 'sequelize-typescript';
import { UserAttribute } from '../attribute/UserAttribute';

export class UserDao {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    @InjectModel(Profile) private readonly profileModel: typeof Profile,
    private readonly sequelize: Sequelize, 
  ) { }
  
  async getUsersWithProfiles(): Promise<User[]> {
    return this.userModel.findAll({
      attributes: UserAttribute.getUserAttributes(),
      include: UserAttribute.getUserIncludes(this.sequelize),
    });
  }

  async getUsersWithPost(): Promise<User[]> {
    return this.userModel.findAll({
      attributes: UserAttribute.getUserAttributes(),
      include: UserAttribute.getPostIncludes(this.sequelize),
    });
  }

  async getUsersWithProfileAndComments(): Promise<User[]> {
    return this.userModel.findAll({
      include: UserAttribute.getUserProfileAndCommentsIncludes(this.sequelize),
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
    return this.userModel.findAll({
      attributes: UserAttribute.getUserAttributes(),
    });
  }

  async getProfilesWithUsers(): Promise<Profile[]> {
    return this.profileModel.findAll({
      include: [
        {
          model: User,
          attributes: UserAttribute.getUserAttributes(),
          required: true,
        },
      ],
    });
  }

  async getUsersWithPagination(query: any, searchQuery: any): Promise<{ rows: User[], count: number, totalPages: number, currentPage: number, perPage: number }> {
    const page = parseInt(query.page as any, 10) || 1;
    const limit = parseInt(query.limit as any, 10) || 10;
    const offset = (page - 1) * limit;

    const { rows, count } = await this.userModel.findAndCountAll({
      where: {
        ...searchQuery, 
      },
      attributes: UserAttribute.getUserAttributes(),
      limit,
      offset,
    });

    const totalPages = Math.ceil(count / limit);

    return {
      rows,
      count,
      totalPages,
      currentPage: page,
      perPage: limit,
    };
  }
}
