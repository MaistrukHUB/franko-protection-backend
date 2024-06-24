import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { DetailsService } from './detail.service';
import { CreateDetailDTO, UpdateDetailDTO } from './dto';
import { DetailResponseDTO } from './response';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { JwtAdminGuard } from 'src/guards/role-guard';

@Controller('detail')
export class DetailController {
  constructor(private readonly detailService: DetailsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  create(@Body() createDetailDTO: CreateDetailDTO): Promise<DetailResponseDTO> {
    return this.detailService.create(createDetailDTO);
  }

  @Get("get-all")
  findAll(): Promise<DetailResponseDTO[]> {
    return this.detailService.findAll();
  }

  @Get('get-one/:id')
  findOne(@Param('id') id: string): Promise<DetailResponseDTO> {
    return this.detailService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string): Promise<boolean> {
    return this.detailService.remove(+id);
  }

  @UseGuards(JwtAdminGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDetailDTO: UpdateDetailDTO,
  ): Promise<DetailResponseDTO> {
    return this.detailService.update(+id, updateDetailDTO);
  }
}
