import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { GrpcMethod } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signin')
  @ApiOperation({ summary: 'Log in' })
  @ApiOkResponse({ description: 'Successful operation' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  signIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }

  @GrpcMethod('Auth', 'Login')
  async grpcSignIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ) {
    const user = await this.authService.grpcSignIn(authCredentialsDto);
    return { user };
  }
}
