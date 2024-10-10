import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { UserQueryRequestBodyDto } from './user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseHelper } from '../common/helpers/response-helper';
import { ResponseCode } from '../common/enums/response-code.enum';
import { Response } from 'express';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('with-profile-comments')
  async getUsersWithProfileAndComments() {
    return this.userService.getUsersWithProfileAndComments();
  }

  @ApiOperation({ summary: 'Get user with profile' })
  @ApiResponse({
    status: 200,
    description: 'List of user with profile',
  })
  @Get('with-profile')
  async getUsersWithProfiles(@Res() res: Response) {
    try {
      const data = await this.userService.getUsersWithProfiles();
      return ResponseHelper.generate(res, ResponseCode.OK, { data: data });
    } catch (error) {
      return ResponseHelper.generate(
        res,
        ResponseCode.SERVER_GENERAL_ERROR,
        null,
        error.message
      );
    }
  }

  @Get('with-post')
  async getUsersWithPost() {
    return this.userService.getUsersWithPost();
  }

  @Get('profiles-with-users')
  async getProfilesWithUsers() {
    return this.userService.getProfilesWithUsers();
  }


  @ApiOperation({ summary: 'Get All users' })
  @ApiResponse({
    status: 200,
    description: 'List of All users with',
  })
  @Get()
  async getAllUsers(@Res() res: Response) {
    try {
      const data = await this.userService.getAllUsers();
      return ResponseHelper.generate(res, ResponseCode.OK, { data: data });
    } catch (error) {
      return ResponseHelper.generate(
        res,
        ResponseCode.SERVER_GENERAL_ERROR,
        null,
        error.message
      );
    }
  }

  @ApiOperation({ summary: 'Get paginated users with search functionality using request body' })
  @ApiResponse({
    status: 200,
    description: 'List of paginated users with search',
    type: UserQueryRequestBodyDto
  })
  @Post('paginated')
  async getUsersWithPagination(
    @Body() body: UserQueryRequestBodyDto,
    @Res() res: Response
  ) {
    try {
      const data = await this.userService.getUsersWithPaginationRequesBodyService(body);

      return ResponseHelper.paginate(
        res,
        data.rows,
        data.currentPage,
        data.totalPages,
        data.perPage,
        data.count
      );
    } catch (error) {
      return ResponseHelper.generate(
        res,
        ResponseCode.INVALID_FIELD_FORMAT,
        {},
        error.message
      );
    }
  }
}
