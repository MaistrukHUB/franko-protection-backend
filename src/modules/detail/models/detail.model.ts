import {
  Column,
  DataType,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { Color } from 'src/modules/colors/models/color.module';
import { Image } from 'src/modules/images/models/image.model';
import { Motorcycle } from 'src/modules/motorcycles/models/motorcycle.model';
import { Sale } from 'src/modules/sales/models/sales.model';
import { Year } from 'src/modules/years/models/years.model';

@Table({ tableName: 'details' })
export class Detail extends Model<Detail> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  cost: number;

  @Column({
    type: DataType.STRING(3000),
    allowNull: false,
  })
  about: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  material: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  weight: number;

  @HasMany(() => Image)
  imgs: Image[];

  @HasMany(() => Color)
  colors: Color[];

  @HasMany(() => Year)
  years: Year[];

  @HasOne(() => Sale)
  sale: Sale;

  @HasMany(() => Motorcycle)
  motorcycles: Motorcycle[];
}
