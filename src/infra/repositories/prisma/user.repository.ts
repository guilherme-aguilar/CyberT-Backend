import { Injectable } from '@nestjs/common';
import { UserM } from '@app/models/user';
import { PrismaService } from '@infra/services/prisma/prisma.service';
import { UserRepository } from '@app/repositories/userRepository.interface';
import { UserMapper } from '@infra/mappers/user.mapper';

@Injectable()
export class DatabaseUserRepository implements UserRepository {
  constructor(private readonly userEntityRepository: PrismaService) {}

  async updateRefreshToken(
    username: string,
    refreshToken: string,
  ): Promise<void> {
    await this.userEntityRepository.user.update({
      where: {
        username: username,
      },
      data: { hach_refresh_token: refreshToken },
    });
  }

  async getUserByUsername(username: string): Promise<UserM> {
    const adminUserEntity = await this.userEntityRepository.user.findUnique({
      where: {
        username: username,
      },
    });
    if (!adminUserEntity) {
      return null;
    }

    return UserMapper.toDomain(adminUserEntity);
  }

  async updateLastLogin(username: string): Promise<void> {
    await this.userEntityRepository.user.update({
      where: {
        username: username,
      },
      data: {
        last_login: new Date(),
      },
    });
  }

  async changePassword(username: string, password: string): Promise<void> {
    await this.userEntityRepository.user.update({
      where: {
        username: username,
      },
      data: { password: password },
    });
  }

  async create(username: string, password: string): Promise<void> {
    await this.userEntityRepository.user.create({
      data: {
        username, password
      }
    })
  }
}
