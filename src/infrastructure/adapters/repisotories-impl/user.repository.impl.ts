import { DataSource, Repository } from 'typeorm';
import { UserModel } from '../../../domain/models/user.model';
import { UserRepository } from '../../../domain/ports/repositories/user.repository';
import { UserEntity } from '../../database/entities/user.entity';
import { UserMapper } from '../../mappers/user/user.mapper';

export class UserRepositoryImpl implements UserRepository {
  private userRepository: Repository<UserEntity>;
  constructor(
    private readonly dataSource: DataSource,
    private readonly userMapper: UserMapper,
  ) {
    this.userRepository = this.dataSource.getRepository(UserEntity);
  }
  async findByEmail(email: string): Promise<UserModel | null> {
    const userEntity: UserEntity | null = await this.userRepository.findOne({
      where: { email },
    });
    return userEntity ? this.userMapper.entityToModel(userEntity) : null;
  }
  async getUserById(id: string): Promise<UserModel | null> {
    const userEntity = await this.userRepository.findOne({
      where: { id },
    });
    return userEntity ? this.userMapper.entityToModel(userEntity) : null;
  }
  async createUser(user: UserModel): Promise<UserModel> {
    return this.userMapper.entityToModel(await this.userRepository.save(this.userMapper.modelToEntity(user)));
  }
}
