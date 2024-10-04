import { Injectable } from '@nestjs/common';
import { UserDao } from './user.dao';
import { UserQueryDto } from './user.dto'; // Pastikan DTO diimport

@Injectable()
export class UserService {
  constructor(private readonly userDao: UserDao) {}

  async getUsersWithProfiles(): Promise<any> {
    return this.userDao.getUsersWithProfiles();
  }

  async getUsersWithPost(): Promise<any> {
    return this.userDao.getUsersWithPost();
  }

  async getUsersWithProfileAndComments(): Promise<any> {
    return this.userDao.getUsersWithProfileAndComments();
  }

  async getUsersWithProfile(): Promise<any> {
    return this.userDao.getUsersWithProfile();
  }

  async getAllUsers(): Promise<any> {
    return this.userDao.getAllUsers();
  }

  async getProfilesWithUsers(): Promise<any> {
    return this.userDao.getProfilesWithUsers();
  }

  async getUsersWithPagination(query: UserQueryDto): Promise<any> {
    return this.userDao.getUsersWithPagination(query);
  }
}
