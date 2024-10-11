import { Injectable } from '@nestjs/common';
import { UserDao } from './user.dao';
import { UserQueryParamsDto, UserQueryRequestBodyDto } from './user.dto';
import { LogHelper } from 'src/common/helpers/log-helper';
import { SearchHelper } from 'src/common/helpers/search-helper';
import { SearchValidation } from 'src/common/validations/search-validation';

@Injectable()
export class UserService {
  constructor(private readonly userDao: UserDao) { }

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

  async getAllUsers() {
    try {
      const users = await this.userDao.getAllUsers();
      LogHelper.info('users', 'Successfully fetched all', { userCount: users.length, className: 'UserService', methodName: 'getAllUsers', data: users }, 'json');
      // LogHelper.info('users', 'Successfully fetched all haha', { userCount: users.length, className: 'UserService', methodName: 'getAllUsers' }, 'txt');
      return users;
    } catch (error) {
      // LogHelper.error('users', 'Failed to fetch all users', { className: 'UserService', methodName: 'getAllUsers' }, 'json');
      throw error;
    }
  }

  async getProfilesWithUsers(): Promise<any> {
    return this.userDao.getProfilesWithUsers();
  }

  async getUsersWithPaginationRequestParamsService(query: UserQueryParamsDto) {
    const allowedFields = ['name', 'email', 'createdAt'];

    const { isValid, errors } = SearchValidation.validateSearchFields(query, allowedFields);
    if (!isValid) {
      throw new Error(`Invalid search fields: ${errors.join(', ')}`);
    }

    const searchQuery = SearchHelper.buildSearchQuery(query, allowedFields);

    return this.userDao.getUsersWithPagination(query, searchQuery);
  }

  async getUsersWithPaginationRequesBodyService(query: UserQueryRequestBodyDto) {
    const allowedFields = ['name', 'email', 'createdAt'];

    const { isValid, errors } = SearchValidation.validateSearchFields(query, allowedFields);
    
    if (!isValid) {
      throw new Error(`Invalid search fields: ${errors.join(', ')}`);
    }

    const searchQuery = SearchHelper.buildSearchRequestBodyQuery(query, allowedFields);
    return this.userDao.getUsersWithPagination(query, searchQuery);
  }
}
