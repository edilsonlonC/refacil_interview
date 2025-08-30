import { TransactionModel } from '../../../domain/models/transaction.model';
import { TransactionEntity } from '../../database/entities/transaction.entity';
import { TransactionCreateDto } from '../../DTOs/transaction/transaction.create.dto';
import { TransactionResponseDto } from '../../DTOs/transaction/transaction.response.dto';

export class TransactionMapper {
  modelToEntity(transaction: TransactionModel): TransactionEntity {
    const transactionEntity = new TransactionEntity();
    transactionEntity.userId = transaction.getUserId();
    transactionEntity.amount = transaction.getAmount();
    transactionEntity.type = transaction.getType()!;
    return transactionEntity;
  }
  entityToModel(transactionEntity: TransactionEntity): TransactionModel {
    return new TransactionModel(
      transactionEntity.userId,
      transactionEntity.amount,
      transactionEntity.transactionId,
      transactionEntity.type,
      transactionEntity.timestamp,
    );
  }
  createDtoToModel(transactionCreateDto: TransactionCreateDto): TransactionModel {
    return new TransactionModel(
      transactionCreateDto.getUserId(),
      transactionCreateDto.getAmount(),
      undefined,
      transactionCreateDto.getType(),
    );
  }
  modelToResponseDto(transactionModel: TransactionModel): TransactionResponseDto {
    return new TransactionResponseDto(
      transactionModel.getTransactionId()!,
      transactionModel.getUserId(),
      transactionModel.getAmount(),
      transactionModel.getType()!,
      transactionModel.getTimestamp()!,
    );
  }
}
