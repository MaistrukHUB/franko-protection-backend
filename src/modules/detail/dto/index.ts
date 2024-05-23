import {
  IsArray,
  IsNumber,
  IsString,
  ArrayMinSize,
  IsOptional,
  Min,
  Max,
  MinLength,
} from 'class-validator';

export class CreateDetailDTO {
  /**
   * Назва деталі. Має містити щонайменше два символи.
   */
  @IsString()
  @MinLength(2)
  name: string;

  /**
   * Опис деталі. Має містити щонайменше два символи.
   */
  @IsString()
  @MinLength(2)
  about: string;

  /**
   * Вартість деталі. Не може бути менше 0.
   */
  @IsNumber()
  @Min(0)
  cost: number;

  /**
   * Матеріал, з якого виготовлена деталь. Має містити щонайменше два символи.
   */
  @IsString()
  @MinLength(2)
  material: string;

  /**
   * Вага деталі. Не може бути менше 0.
   */
  @IsNumber()
  @Min(0)
  weight: number;

  /**
   * Масив зображень деталі. Має містити щонайменше одне зображення.
   */
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  imgs: string[];

  /**
   * Масив кольорів деталі. Має містити щонайменше один колір.
   */
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  colors: string[];

  /**
   * Масив років випуску деталі. Має містити щонайменше один рік.
   */
  @IsArray()
  @ArrayMinSize(1)
  @IsNumber({}, { each: true })
  years: number[];

  /**
   * Знижка на деталь. Необов'язкове поле. Має бути від 0 до 100.
   */
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  sale?: number;

  /**
   * Масив моделей мотоциклів, до яких підходить деталь. Має містити щонайменше одну модель.
   */
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  motorcycles: string[];
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
}
