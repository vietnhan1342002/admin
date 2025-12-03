import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
interface PayLoad {
  email: string;
  role: string;
  name: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Email hoặc mật khẩu không chính xác.');
    }

    const tokens = await this.generateUserTokens({
      email: user.email,
      role: user.role,
      name: user.name,
    });

    return {
      ...tokens,
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (user && user.password === password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async generateUserTokens(payLoad: PayLoad) {
    const { email, role, name } = payLoad;
    const accessToken = await this.jwtService.signAsync(
      { email, role, name }, // ✔ GIỜ ĐÃ ĐÚNG
      { secret: process.env.JWT_SECRET, expiresIn: '1h' },
    );
    const refreshToken = uuidv4();

    // await this.storeRefreshToken(refreshToken, userId);
    return {
      accessToken,
      refreshToken,
    };
  }
}
