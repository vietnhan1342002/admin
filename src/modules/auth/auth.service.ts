import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { comparePassword } from 'src/shared/utils/hashPassword';
import { UserRole } from '../users/enum/user-role.enum';
import { Request } from 'express';
interface PayLoad {
  id: string;
  email: string;
  role: UserRole;
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

    if (!user.isActive || user.deletedAt) {
      throw new UnauthorizedException('Người dùng tạm khóa.');
    }

    const tokens = await this.generateUserTokens({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      ...tokens,
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({ where: { email } });
    const compared = await comparePassword(password, user!.password);

    if (user && compared) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  profile(req: Request) {
    const user = req.user;

    if (!user) {
      throw new UnauthorizedException('Người dùng chưa đăng nhập');
    }

    return user;
  }

  async generateUserTokens(payLoad: PayLoad) {
    const { id, email, role } = payLoad;
    const accessToken = await this.jwtService.signAsync(
      { id, email, role }, // ✔ GIỜ ĐÃ ĐÚNG
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
