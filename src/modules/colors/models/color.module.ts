import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Detail } from 'src/modules/detail/models/detail.model';

@Table({ tableName: 'colors' })
export class Color extends Model<Color> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  color: string;

  @ForeignKey(() => Detail)
  @Column
  detailId: number;
}
