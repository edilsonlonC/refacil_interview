import { Hasher } from "../../src/domain/ports/hasher/hasher";
import { BcryptHasher } from "../../src/infrastructure/adapters/hasher/bcrypt.hasher";
import { UserEntity } from "../../src/infrastructure/database/entities/user.entity";
import { faker } from "@faker-js/faker";
import { mockGenerator } from "./mock.generator";


export const userMockGenerator = async (): Promise<UserEntity> => {
  const hasher: Hasher = new BcryptHasher();
  const passwordPlain: string = faker.internet.password();
  const passwordHash: string = await hasher.hash(passwordPlain);
  const userEntity: UserEntity = new UserEntity();
  userEntity.name = faker.person.firstName();
  userEntity.email = faker.internet.email().toLowerCase();
  userEntity.password = passwordHash;
  const userMock: UserEntity = await mockGenerator<UserEntity>(userEntity);
  userMock.password = passwordPlain;
  return userMock;
}
