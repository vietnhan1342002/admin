import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { EntityManager, IsNull, MoreThan, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { comparePassword } from 'src/shared/utils/hashPassword';
import { UserRole } from '../users/enum/user-role.enum';
import { Request } from 'express';
import { MailerService } from '@nestjs-modules/mailer';
import { EmailRepository } from '../users/repositories/email.repository';
import { EmailVerificationToken } from '../users/entities/email.entity';
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
    @InjectRepository(EmailVerificationToken)
    private emailsRepository: Repository<EmailVerificationToken>,
    private emailRepo: EmailRepository,
    private jwtService: JwtService,
    private mailerService: MailerService,
    private manager: EntityManager,
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

    if (!user.isVerifyEmail) {
      throw new UnauthorizedException('Người dùng chưa được kích hoạt.');
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

  async profile(id: string) {
    const user = await this.usersRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('Không có người dùng này');
    }
    const cleanUser = {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
      avatarUrl: user.avatarUrl,
      phone: user.phone,
    };

    return cleanUser;
  }

  async generateUserTokens(payLoad: PayLoad) {
    const { id, email, role } = payLoad;
    const access_token = await this.jwtService.signAsync(
      { id, email, role }, // ✔ GIỜ ĐÃ ĐÚNG
      { secret: process.env.JWT_SECRET, expiresIn: '1h' },
    );
    const refreshToken = uuidv4();

    // await this.storeRefreshToken(refreshToken, userId);
    return {
      access_token,
      refreshToken,
    };
  }

  async verifyEMail(token: string) {
    const record = await this.emailRepo.findTokenWithUser({
      token,
      usedAt: IsNull(),
      expiredAt: MoreThan(new Date()),
    });

    if (!record) {
      throw new BadRequestException(
        'Link xác nhận không hợp lệ hoặc đã hết hạn',
      );
    }
    await this.manager.transaction(async (manager) => {
      record.user.isVerifyEmail = true;
      record.usedAt = new Date();

      await manager.save(User, record.user);
      await manager.save(EmailVerificationToken, record);
    });

    return {
      message: 'Xác nhận email thành công. Bạn có thể đăng nhập.',
    };
  }
}
