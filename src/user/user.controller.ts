import { Controller, Get, Query, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { UserQueryDto } from './user.dto'; // Import DTO
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('with-profile-comments')
  async getUsersWithProfileAndComments() {
    return this.userService.getUsersWithProfileAndComments();
  }

  @Get('with-profile')
  async getUsersWithProfiles() {
    return this.userService.getUsersWithProfiles();
  }

  @Get('with-post')
  async getUsersWithPost() {
    return this.userService.getUsersWithPost();
  }

  @Get('profiles-with-users')
  async getProfilesWithUsers() {
    return this.userService.getProfilesWithUsers();
  }

  @Get()
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @ApiOperation({ summary: 'Get paginated users' })
  @ApiResponse({
    status: 200,
    description: 'List of paginated users with search functionality',
  })
  @Get('/paginated')
  async getUsersWithPagination(
    @Query() query: UserQueryDto
  ) {
    const users = await this.userService.getUsersWithPagination(query);

    return {
      responseResult: true,
      message: 'Success',
      data: {
        ...users,
        page: parseInt(users.page as any, 10), // Pastikan 'page' dikonversi menjadi integer
      },
    };
  }
}
