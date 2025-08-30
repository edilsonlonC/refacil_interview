import { NextFunction, Request, Response } from 'express';
import { UserUseCase } from '../../../../application/use-cases/user.usecase';
import { UserMapper } from '../../../mappers/user/user.mapper';
import { UserModel } from '../../../../domain/models/user.model';
import { UserCreateDto } from '../../../DTOs/user/user.create.dto';
import { UserResponseDto } from '../../../DTOs/user/user.response.dto';
import { StatusCodes } from 'http-status-codes';
import { userValidator } from '../../validators/user/user.validator';
import { badRequest } from '../../errors';
import { userParamsValidator } from '../../validators/params/params.validator';

export class UserController {
  constructor(
    private readonly userUseCase: UserUseCase,
    private readonly userMapper: UserMapper,
  ) {}

  createUser = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { body } = request;
      const validation = userValidator.validate(body);
      const userDto: UserCreateDto = new UserCreateDto(body.name, body.email, body.password);
      if (validation.error) throw badRequest(validation.error.message);
      const userModel: UserModel = this.userMapper.createDtoToModel(userDto);
      const userResponseDto: UserResponseDto = this.userMapper.modelToResponseDto(
        await this.userUseCase.createUser(userModel),
      );
      return response.status(StatusCodes.CREATED).json({
        user: userResponseDto,
      });
    } catch (e: unknown) {
      next(e);
    }
  };
  getUserById = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const validation = userParamsValidator.validate(request.params);
      if (validation.error) throw badRequest(validation.error.message);
      const { id } = request.params;
      const userModel: UserModel | null = await this.userUseCase.findById(id);
      const userResponseDto: UserResponseDto = this.userMapper.modelToResponseDto(userModel);
      return response.status(StatusCodes.OK).json({
        user: userResponseDto,
      });
    } catch (e: unknown) {
      next(e);
    }
  };
}
