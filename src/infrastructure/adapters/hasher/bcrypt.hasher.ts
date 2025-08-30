import { Hasher } from '../../../domain/ports/hasher/hasher';
import bcrypt from 'bcrypt';

export class BcryptHasher implements Hasher {
  private readonly saltRounds = 10;
  hash(value: string): Promise<string> {
    return bcrypt.hash(value, this.saltRounds);
  }
  compare(value: string, hash: string): Promise<boolean> {
    return bcrypt.compare(value, hash);
  }
}
