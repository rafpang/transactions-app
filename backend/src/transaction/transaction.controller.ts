import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { JwtGuard } from "src/auth/guard";
import { TransactionService } from "./transaction.service";
import { GetUser } from "src/auth/decorator";
import { CreateTransactionDto } from "./dto";
import { EditTransactionDto } from "./dto/edit-transaction.dto";

@UseGuards(JwtGuard)
@Controller("transaction")
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Get()
  getTransaction(@GetUser("userId") userId: string) {
    return this.transactionService.getTransactions(userId);
  }
  @Get(":id")
  getTransactionById(
    @GetUser("userId") userId: string,
    @Param("id") transactionId: string
  ) {
    return this.transactionService.getTransactionById(userId, transactionId);
  }

  @Post()
  createTransaction(
    @GetUser("userId") userId: string,
    @Body() dto: CreateTransactionDto
  ) {
    return this.transactionService.createTransaction(userId, dto);
  }

  @Patch(":id")
  editTransactionById(
    @GetUser("userId") userId: string,
    @Param("id") transactionId: string,
    @Body() dto: EditTransactionDto
  ) {
    return this.transactionService.editTransactionById(
      userId,
      transactionId,
      dto
    );
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(":id")
  deleteBookmarkById(
    @GetUser("userId") userId: string,
    @Param("id") transactionId: string
  ) {
    return this.transactionService.deleteTransactionById(userId, transactionId);
  }
}
