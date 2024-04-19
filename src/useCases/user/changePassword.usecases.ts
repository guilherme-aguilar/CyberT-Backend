import { IBcryptService } from '@app/adapters/bcrypt.interface';
import { UserM } from '@app/models/user';
import { UserRepository } from '@app/repositories/userRepository.interface';
import { Injectable } from '@nestjs/common';

interface Request {
  username: string;
  newPassword: string;
  confirmPassword: string;
  currentPassword: string;
}

interface Response {
  data: UserM;
}

@Injectable()
export class ChangePassword_User {
  constructor(
    private userRepository: UserRepository,
    private bcryptService: IBcryptService
    ) {}

  async execute(request: Request): Promise<void> {
    
    const userData = await this.userRepository.getUserByUsername(request.username);

    if(request.newPassword !== request.confirmPassword) {
      throw new Error('New password and confirm password do not match');
    }

    const validateCurrentPassword = await this.bcryptService.compare(request.currentPassword, userData.password)

    const validateNewPassword = await this.bcryptService.compare(request.newPassword, userData.password);


    if(validateNewPassword){
      throw new Error('New password cannot be the same as current password');
    }
    
    if (!validateCurrentPassword) {
      throw new Error('Current password is incorrect');
    }

    userData.password = await this.bcryptService.hash(request.newPassword)

    await this.userRepository.changePassword(userData.username, userData.password);
    
  }
}
