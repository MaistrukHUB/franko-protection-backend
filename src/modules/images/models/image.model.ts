import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Detail } from 'src/modules/detail/models/detail.model';

@Table({ tableName: 'images' })
export class Image extends Model<Image> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  img: string;

  @ForeignKey(() => Detail)
  @Column
  detailId: number;
}
