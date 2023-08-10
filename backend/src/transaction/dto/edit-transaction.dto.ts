import { IsDecimal, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class EditTransactionDto {
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
