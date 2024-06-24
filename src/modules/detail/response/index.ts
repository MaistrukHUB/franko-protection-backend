import {
  IsArray,
  IsNumber,
  IsString,
  ArrayMinSize,
  IsOptional,
  IsIn,
} from 'class-validator';

export class DetailResponseDTO {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  about: string;

  @IsNumber()
  cost: number;

  @IsNumber()
  finalCost: number;

  @IsString()
  material: string;

  @IsNumber()
  weight: number;

  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  imgs: string[];

  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  colors: string[];

  @IsArray()
  @ArrayMinSize(1)
  @IsNumber({}, { each: true })
  years: number[];

  @IsOptional()
  @IsNumber()
  sale?: number;

  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  motorcycles: string[];

  @IsString()
  @IsIn(['Захист радіаторів', 'Захист двигуна', 'Інший захист'])
  category: string;
}
