import { hash, verify } from 'argon2';
import { randomBytes } from 'crypto';

export abstract class Argon2 {
	private static HASHING_CONFIG = {
		parallelism: 1,
		memoryCost: 64000, // bytes
		timeCost: 3, // iterations
	}; // OWASP cheat sheet recommendations (as of March, 2022)

	static async hash(password: string) {
		return await hash(password, { ...Argon2.HASHING_CONFIG, salt: randomBytes(16) });
	}

	static async verify(hashedPassword: string, password: string): Promise<boolean> {
		return await verify(hashedPassword, password, Argon2.HASHING_CONFIG);
	}
}
