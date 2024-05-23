import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Detail } from 'src/modules/detail/models/detail.model';

@Table({ tableName: 'motorcycles' })
export class Motorcycle extends Model<Motorcycle> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  motorcycle: string;

  @ForeignKey(() => Detail)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  detailId: number;
}
