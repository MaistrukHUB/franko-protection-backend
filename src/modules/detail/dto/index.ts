import {
  IsArray,
  IsNumber,
  IsString,
  ArrayMinSize,
  IsOptional,
} from 'class-validator';

export class CreateDetailDTO {
  @IsString()
  name: string;

  @IsString()
  about: string;

  @IsNumber()
  cost: number;

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
}

export class UpdateDetailDTO {
  @IsOptional()
  @IsString()
  name?: string;

  @IsNumber()
  cost: number;

  @IsOptional()
  @IsString()
  about?: string;

  @IsOptional()
  @IsString()
  material?: string;

  @IsOptional()
  @IsNumber()
  weight?: number;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  imgs?: string[];

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  colors?: string[];

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @IsNumber({}, { each: true })
  years?: number[];

  @IsOptional()
  @IsNumber()
  sale?: number;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  motorcycles?: string[];
}
