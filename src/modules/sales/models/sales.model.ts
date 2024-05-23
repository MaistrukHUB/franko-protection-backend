import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { IsNumber, Min, Max } from 'class-validator';
import { Detail } from 'src/modules/detail/models/detail.model';

@Table({ tableName: 'sales' })
export class Sale extends Model<Sale> {
  @IsNumber()
  @Min(0)
  @Max(100)
  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  sale: number;

  @ForeignKey(() => Detail)
  @Column
  detailId: number;
}
