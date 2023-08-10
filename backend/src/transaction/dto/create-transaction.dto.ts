import { IsDecimal, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTransactionDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsDecimal()
  @IsNotEmpty()
  amount: number;
}
