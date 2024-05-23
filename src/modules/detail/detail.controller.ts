import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DetailsService } from './detail.service';
import { CreateDetailDTO, UpdateDetailDTO } from './dto';
import { DetailResponseDTO } from './response';

@Controller('detail')
export class DetailController {
  constructor(private readonly detailService: DetailsService) {}

  @Post('create')
  create(@Body() createDetailDTO: CreateDetailDTO): Promise<DetailResponseDTO> {
    return this.detailService.create(createDetailDTO);
  }

  @Get()
  findAll(): Promise<DetailResponseDTO[]> {
    return this.detailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<DetailResponseDTO> {
    return this.detailService.findOne(id);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.detailService.remove(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDetailDTO: UpdateDetailDTO,
  ): Promise<DetailResponseDTO> {
    return this.detailService.update(+id, updateDetailDTO);
  }
}
