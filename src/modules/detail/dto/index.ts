import {
  IsArray,
  IsNumber,
  IsString,
  ArrayMinSize,
  IsOptional,
  Min,
  Max,
  MinLength,
  IsIn,
} from 'class-validator';

export class CreateDetailDTO {
  @IsString()
  @MinLength(2)
  name: string;

  @IsString()
  @MinLength(2)
  about: string;

  @IsNumber()
  @Min(0)
  cost: number;

  @IsString()
  @MinLength(2)
  material: string;

  @IsNumber()
  @Min(0)
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
  @Min(0)
  @Max(100)
  sale?: number;

  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  motorcycles: string[];

  @IsString()
  @IsIn(['Захист радіаторів', 'Захист двигуна', 'Інший захист'])
  category: string;
}

export class UpdateDetailDTO {
  @IsOptional()
  @IsString()
  @MinLength(2)
  name?: string;

  @IsNumber()
  @Min(0)
  cost: number;

  @IsOptional()
  @IsString()
  @MinLength(2)
  about?: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  material?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
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
  @Min(0)
  @Max(100)
  sale?: number;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  motorcycles?: string[];

  @IsOptional()
  @IsString()
  @IsIn(['Захист радіаторів', 'Захист двигуна', 'Інший захист'])
  category?: string;
}
