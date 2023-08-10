import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class EditTransactionDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;
}
