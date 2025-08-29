import { UserModel } from '../../models/user.model';

export interface UserRepository {
  getUserById(id: string): Promise<UserModel | null>;
  findByEmail(email: string): Promise<UserModel | null>;
  createUser(user: UserModel): Promise<UserModel>;
}
