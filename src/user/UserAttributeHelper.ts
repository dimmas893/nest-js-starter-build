import { Sequelize } from 'sequelize-typescript';
import { Profile } from '../profile/profile.model';
import { Post } from '../post/post.model';
import { Comment } from '../comment/comment.model';

export class UserAttributeHelper {
  static getUserAttributes() {
    return ['id', 'name', 'email', 'createdAt', 'updatedAt'];
  }

  static getProfileAttributes() {
    return ['id', 'bio', 'createdAt', 'updatedAt'];
  }

  static getPostAttributes() {
    return ['id', 'title', 'content'];
  }

  static getCommentAttributes() {
    return ['content'];
  }

  static getUserIncludes(sequelize: Sequelize) {
    return [
      {
        model: Profile,
        as: 'userProfiles',
        attributes: this.getProfileAttributes(),
        required: false,
      },
    ];
  }

  static getPostIncludes(sequelize: Sequelize) {
    return [
      {
        model: Post,
        as: 'posts',
        attributes: this.getPostAttributes(),
        required: false,
      },
    ];
  }

  static getUserProfileAndCommentsIncludes(sequelize: Sequelize) {
    return [
      {
        model: Profile,
        attributes: this.getProfileAttributes(),
      },
      {
        model: Comment,
        as: 'userComments',
        attributes: this.getCommentAttributes(),
      },
    ];
  }
}
