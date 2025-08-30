import { EntityExistError } from '../../domain/errors/entity.exist.error';
import { EntityNotFoundError } from '../../domain/errors/entity.not.found.error';
import { UserModel } from '../../domain/models/user.model';
import { Hasher } from '../../domain/ports/hasher/hasher';
import { UserRepository } from '../../domain/ports/repositories/user.repository';

export class UserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hasher: Hasher,
  ) {}
  async createUser(user: UserModel): Promise<UserModel> {
    const userExist: UserModel | null = await this.userRepository.findByEmail(user.getEmail());
    if (userExist) throw new EntityExistError('user.already.exist');
    user.setPassword(await this.hasher.hash(user.getPassword()!));
    return this.userRepository.createUser(user);
  }
  async findById(id: string): Promise<UserModel> {
    const user: UserModel | null = await this.userRepository.getUserById(id);
    if (!user) throw new EntityNotFoundError('user.not.found');
    return user;
  }
}
