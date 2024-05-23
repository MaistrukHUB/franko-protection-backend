import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Detail } from 'src/modules/detail/models/detail.model';

@Table({ tableName: 'years' })
export class Year extends Model<Year> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  year: number;

  @ForeignKey(() => Detail)
  @Column
  detailId: number;
}
