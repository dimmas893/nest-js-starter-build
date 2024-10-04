import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Profile } from '../profile/profile.model';
import { Comment } from '../comment/comment.model';

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

  // Relasi one-to-many (User memiliki banyak Profile)
  @HasMany(() => Profile, { as: 'userProfiles' })
  profiles: Profile[];

  // Relasi one-to-many (User memiliki banyak Comment)
  @HasMany(() => Comment, { as: 'userComments' })
  comments: Comment[];
}
