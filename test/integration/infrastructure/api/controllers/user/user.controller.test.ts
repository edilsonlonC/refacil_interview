import { Application } from "express";
import TestAgent from "supertest/lib/agent";
import { initApp } from "../../../../../../src/infrastructure/api/app";
import supertest from "supertest";
import { UserCreateDto } from "../../../../../../src/infrastructure/DTOs/user/user.create.dto";
import { faker } from "@faker-js/faker";
import { getReasonPhrase, StatusCodes } from "http-status-codes";
import { userMockGenerator } from "../../../../../mock-generator/user.mock.generator";
import { UserEntity } from "../../../../../../src/infrastructure/database/entities/user.entity";
import { clearMock } from "../../../../../mock-generator/mock.generator";

describe('#User controller', () => {
  let app: Application;
  let request: TestAgent;
  const url: string = '/user';
  beforeAll(async () => {
    app = await initApp()
    request = supertest(app);
  });
  beforeEach(async () => {
    await clearMock(UserEntity.name);
  });
  it('should return 200 when create user', async () => {
    const userCreateDto: UserCreateDto = new UserCreateDto(faker.person.firstName(), faker.internet.email(), faker.internet.password());
    const response = await request.post(url).send(userCreateDto);
    expect(response.status).toBe(StatusCodes.CREATED);
    const user = response.body.user;
    expect(user.email).toBe(userCreateDto.getEmail());
    expect(user.name).toBe(userCreateDto.getName());
  });

  it('should return 400 when create user when user already exist', async () => {
    const userEntity: UserEntity = await userMockGenerator();
    const response = await request.post(url).send({
      name: userEntity.name,
      email: userEntity.email,
      password: userEntity.password,
    });
    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    expect(response.body.message).toBe('user.already.exist');
    expect(response.body.statusCode).toBe(StatusCodes.BAD_REQUEST);
    expect(response.body.statusMessage).toBe(getReasonPhrase(StatusCodes.BAD_REQUEST));
  });
  it('should return 400 when create user when email is not valid', async () => {
    const userCreateDto: UserCreateDto = new UserCreateDto(faker.person.firstName(), 'invalid', faker.internet.password());
    const response = await request.post(url).send(userCreateDto);
    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    expect(response.body.message).toContain('must be a valid email');
    expect(response.body.statusCode).toBe(StatusCodes.BAD_REQUEST);
    expect(response.body.statusMessage).toBe(getReasonPhrase(StatusCodes.BAD_REQUEST));
  });

  it('should return 400 when create user when password is not valid', async () => {
    const response = await request.post(url).send({
      name: faker.person.firstName(),
      email: faker.internet.email(),
      password: '',
    });
    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    expect(response.body.message).toContain('\"password\" is not allowed to be empty');
    expect(response.body.statusCode).toBe(StatusCodes.BAD_REQUEST);
    expect(response.body.statusMessage).toBe(getReasonPhrase(StatusCodes.BAD_REQUEST));
  });



});
