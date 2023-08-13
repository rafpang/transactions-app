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
  public async getTransactionSummary(userId: string) {
    try {
      const expenseAggregation = await this.prismaService.transaction.aggregate(
        {
          _sum: {
            amount: true,
          },
          where: {
            userId: userId,
            category: "Expense",
          },
        }
      );
      const incomeAggregation = await this.prismaService.transaction.aggregate({
        _sum: {
          amount: true,
        },
        where: {
          userId: userId,
          category: "Income",
        },
      });

      const expenseSum = expenseAggregation?._sum?.amount || 0;
      const incomeSum = incomeAggregation?._sum?.amount || 0;
      const transactionSummary = incomeSum - expenseSum;

      return {
        incomeSum: incomeSum,
        expenseSum: expenseSum,
        transactionSummary: transactionSummary,
      };
    } catch (error) {
      console.error("Error fetching transaction summary:", error);
      throw new Error("Failed to fetch transaction summary.");
    }
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

    await this.prismaService.transaction.delete({
      where: {
        transactionId: transactionId,
      },
    });
  }
}
