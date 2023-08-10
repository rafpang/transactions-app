import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateTransactionDto } from "./dto";
import { EditTransactionDto } from "./dto/edit-transaction.dto";

@Injectable()
export class TransactionService {
  constructor(private prismaService: PrismaService) {}

  getTransactions(userId: string) {
    return this.prismaService.transaction.findMany({
      where: {
        userId: userId,
      },
    });
  }

  getTransactionById(userId: string, transactionId: string) {
    return this.prismaService.transaction.findFirst({
      where: {
        transactionId: transactionId,
        userId: userId,
      },
    });
  }

  async createTransaction(userId: string, dto: CreateTransactionDto) {
    const transaction = await this.prismaService.transaction.create({
      data: {
        userId,
        ...dto,
      },
    });

    return transaction;
  }

  async editTransactionById(
    userId: string,
    transactionId: string,
    dto: EditTransactionDto
  ) {
    // get the Transaction by id
    const transaction = await this.prismaService.transaction.findUnique({
      where: {
        transactionId: transactionId,
      },
    });

    // check if user owns the Transaction
    if (!transaction || transaction.userId !== userId)
      throw new ForbiddenException(
        "Access to resources is denied or not found"
      );

    return this.prismaService.transaction.update({
      where: {
        transactionId: transactionId,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteTransactionById(userId: string, transactionId: string) {
    const Transaction = await this.prismaService.transaction.findUnique({
      where: {
        transactionId: transactionId,
      },
    });

    // check if user owns the Transaction
    if (!Transaction || Transaction.userId !== userId)
      throw new ForbiddenException(
        "Access to resources is denied or not found"
      );

    await this.prismaService.transaction.delete({
      where: {
        transactionId: transactionId,
      },
    });
  }
}
