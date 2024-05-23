import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Detail } from 'src/modules/detail/models/detail.model';

@Table({ tableName: 'sales' })
export class Sale extends Model<Sale> {
  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  sale: number;

  @ForeignKey(() => Detail)
  @Column
  detailId: number;
}
