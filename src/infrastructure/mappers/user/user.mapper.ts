import { UserModel } from '../../../domain/models/user.model';
import { UserEntity } from '../../database/entities/user.entity';
import { UserCreateDto } from '../../DTOs/user/user.create.dto';
import { UserResponseDto } from '../../DTOs/user/user.response.dto';

export class UserMapper {
  modelToEntity(user: UserModel): UserEntity {
    const userEntity = new UserEntity();
    userEntity.id = user.getId()!;
    userEntity.name = user.getName();
    userEntity.password = user.getPassword()!;
    userEntity.email = user.getEmail();
    userEntity.balance = user.getBalance()!;
    return userEntity;
  }
  entityToModel(userEntity: UserEntity): UserModel {
    return new UserModel(userEntity.name, userEntity.email, userEntity.id, userEntity.balance);
  }
  createDtoToModel(userDto: UserCreateDto): UserModel {
    return new UserModel(userDto.getName(), userDto.getEmail(), undefined, undefined, userDto.getPassword());
  }
  modelToResponseDto(userModel: UserModel): UserResponseDto {
    return new UserResponseDto(userModel.getId()!, userModel.getName(), userModel.getEmail(), userModel.getBalance()!);
  }
}
