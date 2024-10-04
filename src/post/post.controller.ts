import { Controller, Get } from '@nestjs/common';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  // Route untuk mendapatkan data dengan INNER JOIN
  @Get('with-user-comments')
  async getPostsWithUserAndComments() {
    return this.postService.findPostsWithUserAndComments();
  }

  // Route untuk mendapatkan data dengan LEFT JOIN
  @Get('users-with-posts')
  async getUsersWithPosts() {
    return this.postService.findUsersWithPosts();
  }

  // Route untuk mendapatkan data dengan RIGHT JOIN
  @Get('right-join')
  async getPostsWithUsersRightJoin() {
    return this.postService.findPostsWithUsersRightJoin();
  }
}
