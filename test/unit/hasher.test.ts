import { Hasher } from '../../src/domain/ports/hasher/hasher';
import { BcryptHasher } from '../../src/infrastructure/adapters/hasher/bcrypt.hasher';
describe('#Hasher', () => {
  it('should return string hash', async () => {
    const hasher: Hasher = new BcryptHasher();
    const text: string = '123456';
    const hash = await hasher.hash(text);
    expect(hash).toBeDefined();
    expect(typeof hash).toBe('string');
    expect(hash.length).toBeGreaterThan(0);
    expect(hash !== text).toBe(true);

  });
  it('should return true if hash is correct', async () => {
    const hasher: Hasher = new BcryptHasher();
    const text: string = '123456';
    const hash = await hasher.hash(text);
    const isCorrect = await hasher.compare(text, hash);
    expect(isCorrect).toBe(true);
  });
  it('should return false if hash is not correct', async () => {
    const hasher: Hasher = new BcryptHasher();
    const text: string = '123456';
    const hash = await hasher.hash(text);
    const isCorrect = await hasher.compare('12345678', hash);
    expect(isCorrect).toBe(false);
  });
});
