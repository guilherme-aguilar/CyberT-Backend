import { User as RawToPrisma } from '@prisma/client';
import { UserM } from 'src/domain/models/user';

export class UserMapper {
  static toPrisma(raw: UserM) {
    return {
      id: raw.id,
      username: raw.username,
      password: raw.password,
      create_date: raw.createDate,
      updated_date: raw.updatedDate,
      last_login: raw.lastLogin,
      hach_refresh_token: raw.hashRefreshToken,
    };
  }

  static toDomain(raw: RawToPrisma): UserM {
    const adminUser: UserM = new UserM();

    adminUser.id = raw.id;
    adminUser.username = raw.username;
    adminUser.password = raw.password;
    adminUser.createDate = raw.create_date;
    adminUser.updatedDate = raw.updated_date;

    adminUser.lastLogin = raw.last_login;
    adminUser.hashRefreshToken = raw.hach_refresh_token;

    return adminUser;
  }
}
