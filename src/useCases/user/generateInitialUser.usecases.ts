import { IBcryptService } from '@app/adapters/bcrypt.interface';
import { UserM } from '@app/models/user';
import { UserRepository } from '@app/repositories/userRepository.interface';
import { Injectable } from '@nestjs/common';



interface Response {
  data: UserM;
}

@Injectable()
export class GenerateInitial_User {
  constructor(
    private userRepository: UserRepository,
    private bcryptService: IBcryptService
    ) {}

  async execute(): Promise<void> {

    
    
    const password = await this.bcryptService.hash("123@mudar")

    await this.userRepository.create(
      "AdminV4",
      password
    );

  }
}
