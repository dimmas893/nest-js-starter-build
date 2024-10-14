import { Table, Column, Model, DataType, HasMany, HasOne } from 'sequelize-typescript';
import { Profile } from '../../profile/profile.model';
import { Comment } from '../../comment/comment.model';

@Table({
  tableName: 'users',
})
export class User extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @HasOne(() => Profile, { as: 'userProfiles' })
  profiles: Profile[];

  @HasMany(() => Comment, { as: 'userComments' })
  comments: Comment[];
}
