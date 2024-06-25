import { Body, Controller, Inject, Post, Req } from '@nestjs/common';
import { changePasswordUserDto } from './user.dto';
import { UsecasesProxyModule } from '@infra/usecases-proxy/usecases-proxy.module';
import { UseCaseProxy } from '@infra/usecases-proxy/usecases-proxy';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ChangePassword_User } from '@useCases/user/changePassword.usecases';
import { ChangePasswordPresenter } from './user.presenter';
import { IsPublic } from '@infra/common/decorators/is-public.decorator';
import { GenerateInitial_User } from '@useCases/user/generateInitialUser.usecases';


@ApiTags('User')
@ApiResponse({ status: 500, description: 'Internal error' })
@Controller('User')
@ApiExtraModels(ChangePasswordPresenter)
export class UserController {
  constructor(
    
    //create
    @Inject(UsecasesProxyModule.CHANGE_PASSWORD_USER_PROXY)
    private readonly _changePassword: UseCaseProxy<ChangePassword_User>,
    @Inject(UsecasesProxyModule.GENERATE_INITIAL_USER)
    private readonly _generateInitialUser: UseCaseProxy<GenerateInitial_User>,
  ) {}

  @Post("ChangePassword")
  async changePasswordUser(
    @Body() receivedDto: changePasswordUserDto,
    @Req() request : any
  ): Promise<void> {
    
    const dataSend = {username: request.user.username , ...receivedDto}

    await this._changePassword.getInstance().execute(dataSend);

  }

  @IsPublic()
  @Post("InitialUser")
  async generateInitialUser(
  ): Promise<void> {
    await this._generateInitialUser.getInstance().execute();

  }


}
