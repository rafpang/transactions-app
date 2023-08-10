import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { EditUserDto } from "./dto";
import { User } from "@prisma/client";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUserById(userId: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        userId: userId,
      },
    });
    delete user.password;
    return user;
  }

  async editUser(userId: string, dto: EditUserDto) {
    const user = await this.prisma.user.update({
      where: {
        userId: userId,
      },
      data: {
        ...dto,
      },
    });

    delete user.password;

    return user;
  }
}
