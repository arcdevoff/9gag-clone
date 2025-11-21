import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'src/prisma.service';
import { User } from 'generated/prisma';
import { JwtPayload } from 'src/@types/auth';
import { ConfigService } from '@nestjs/config';
import { SignupDto } from './dto/signup.dto';
import { MailService } from 'src/mail/mail.service';
import { randomBytes } from 'crypto';
import { ConfirmDto } from './dto/confirm.dro';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private configService: ConfigService,
    private mailService: MailService,
  ) {}

  async signup(data: SignupDto) {
    const hashed = await bcrypt.hash(data.password, 10);
    const token = randomBytes(16).toString('hex');

    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        username: data.username,
        password: hashed,
      },
    });

    await this.prisma.emailConfirmationToken.create({
      data: {
        token,
        userId: user.id,
      },
    });

    await this.mailService.sendEmail({
      to: data.email,
      subject: `Confirm your email address`,
      html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h2>Welcome to 9GAG Clone! 🎉</h2>
            <p>Hi ${data.username},</p>
            <p>Thank you for signing up! Please confirm your email address by clicking the button below:</p>
            <p style="text-align: center; margin: 30px 0;">
              <a href="${this.configService.get('app').clientUrl}/auth/confirm?token=${token}"
                style="background-color: #007bff; color: #fff; text-decoration: none; 
                        padding: 12px 20px; border-radius: 6px; display: inline-block;">
                Confirm Email
              </a>
            </p>
            <p>If you didn’t create an account, you can safely ignore this email.</p>
            <p>Best regards,<br/>The 9GAG Clone Team 🚀</p>
          </div>
        `,
    });
  }

  async confirm(data: ConfirmDto) {
    const token = data.token;

    const record = await this.prisma.emailConfirmationToken.findUnique({
      where: { token },
    });

    if (!record) throw new NotFoundException('Invalid or expired token');

    const user = await this.prisma.user.update({
      where: {
        id: record.userId,
      },
      data: {
        isConfirmed: true,
      },
    });

    await this.prisma.emailConfirmationToken.delete({ where: { token } });

    return user;
  }

  async validateUser(data: LoginDto): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [
          {
            username: data.username,
          },
          {
            email: data.username,
          },
        ],
        isConfirmed: true,
      },
    });

    if (!user) return null;

    const isMatch = await bcrypt.compare(data.password, user.password);

    return isMatch ? user : null;
  }

  async getTokens(userId: number) {
    const payload: JwtPayload = { id: userId };

    const accessToken = await this.jwt.signAsync(payload, {
      expiresIn: this.configService.get('jwt').accessExpiresIn,
      secret: this.configService.get('jwt').accessSecret,
    });

    const refreshToken = await this.jwt.signAsync(payload, {
      expiresIn: this.configService.get('jwt').refreshExpiresIn,
      secret: this.configService.get('jwt').refreshSecret,
    });

    return { accessToken, refreshToken };
  }
}
