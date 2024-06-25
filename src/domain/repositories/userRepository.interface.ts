import { UserM } from '../models/user';

export interface UserRepository {
  getUserByUsername(username: string): Promise<UserM>;
  updateLastLogin(username: string): Promise<void>;
  updateRefreshToken(username: string, refreshToken: string): Promise<void>;
  changePassword(username: string, password: string): Promise<void>;
  create(username: string, password: string): Promise<void>;
}
