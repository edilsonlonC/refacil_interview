import { EntityExistError } from '../../domain/errors/entity.exist.error';
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
  async findById(id: string): Promise<UserModel | null> {
    return this.userRepository.getUserById(id);
  }
}
