// import { BadRequestException, Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/sequelize';
// import { Detail } from './models/detail.model';
// import { Image } from '../images/models/image.model';
// import { Color } from '../colors/models/color.module';
// import { Year } from '../years/models/years.model';
// import { Sale } from '../sales/models/sales.model';
// import { Motorcycle } from '../motorcycles/models/motorcycle.model';
// import { CreateDetailDTO, UpdateDetailDTO } from './dto';

// @Injectable()
// export class DetailsService {
//   constructor(
//     @InjectModel(Detail)
//     private readonly detailModel: typeof Detail,
//     @InjectModel(Image)
//     private readonly imageModel: typeof Image,
//     @InjectModel(Color)
//     private readonly colorModel: typeof Color,
//     @InjectModel(Year)
//     private readonly yearModel: typeof Year,
//     @InjectModel(Sale)
//     private readonly saleModel: typeof Sale,
//     @InjectModel(Motorcycle)
//     private readonly motorcycleModel: typeof Motorcycle,
//   ) {}

//   async findAll(): Promise<Detail[]> {
//     return this.detailModel.findAll({
//       include: [
//         {
//           model: Image,
//           attributes: ['img'],
//         },
//         {
//           model: Color,
//           attributes: ['color'],
//         },
//         {
//           model: Year,
//           attributes: ['year'],
//         },
//         {
//           model: Sale,
//           attributes: ['sale'],
//         },
//         {
//           model: Motorcycle,
//           attributes: ['motorcycle'],
//         },
//       ],
//     });
//   }

//   async findOne(id: string): Promise<Detail> {
//     const detail = await this.detailModel.findOne({
//       where: { id },
//       include: [Image, Color, Year, Sale, Motorcycle],
//     });

//     return detail;
//   }

//   async create(CreateDetailDTO: CreateDetailDTO): Promise<Detail> {
//     const {
//       name,
//       about,
//       cost,
//       material,
//       weight,
//       imgs,
//       colors,
//       years,
//       sale,
//       motorcycles,
//     } = CreateDetailDTO;

//     const detail = await this.detailModel.create({
//       name,
//       about,
//       cost,
//       material,
//       weight,
//     });

//     if (imgs) {
//       const imageInstances = imgs.map((img) => ({ img, detailId: detail.id }));
//       await this.imageModel.bulkCreate(imageInstances);
//     }

//     if (colors) {
//       const colorInstances = colors.map((color) => ({
//         color,
//         detailId: detail.id,
//       }));
//       await this.colorModel.bulkCreate(colorInstances);
//     }

//     if (years) {
//       const yearInstances = years.map((year) => ({
//         year,
//         detailId: detail.id,
//       }));
//       await this.yearModel.bulkCreate(yearInstances);
//     }

//     if (sale !== undefined) {
//       await this.saleModel.create({ sale, detailId: detail.id });
//     }

//     if (motorcycles) {
//       const motorcycleInstances = motorcycles.map((motorcycle) => ({
//         motorcycle,
//         detailId: detail.id,
//       }));
//       await this.motorcycleModel.bulkCreate(motorcycleInstances);
//     }

//     return this.findOne(detail.id);
//   }

//   async remove(id: number): Promise<void> {
//     // Сначала удаляем из связанных таблиц
//     await this.imageModel.destroy({ where: { detailId: id } });
//     await this.colorModel.destroy({ where: { detailId: id } });
//     await this.yearModel.destroy({ where: { detailId: id } });
//     await this.saleModel.destroy({ where: { detailId: id } });
//     await this.motorcycleModel.destroy({ where: { detailId: id } });

//     // Потом удаляем саму деталь
//     await this.detailModel.destroy({ where: { id } });
//   }

//   async update(id: number, updateDetailDTO: UpdateDetailDTO): Promise<Detail> {
//     const {
//       name,
//       about,
//       cost,
//       material,
//       weight,
//       imgs,
//       colors,
//       years,
//       sale,
//       motorcycles,
//     } = updateDetailDTO;

//     const detail = await this.detailModel.findByPk(id);
//     if (!detail) {
//       throw new BadRequestException('Detail not found');
//     }

//     await detail.update({
//       name,
//       cost,
//       about,
//       material,
//       weight,
//     });

//     if (imgs) {
//       await this.imageModel.destroy({ where: { detailId: id } });
//       const imageInstances = imgs.map((img) => ({ img, detailId: id }));
//       await this.imageModel.bulkCreate(imageInstances);
//     }

//     if (colors) {
//       await this.colorModel.destroy({ where: { detailId: id } });
//       const colorInstances = colors.map((color) => ({ color, detailId: id }));
//       await this.colorModel.bulkCreate(colorInstances);
//     }

//     if (years) {
//       await this.yearModel.destroy({ where: { detailId: id } });
//       const yearInstances = years.map((year) => ({ year, detailId: id }));
//       await this.yearModel.bulkCreate(yearInstances);
//     }

//     if (sale) {
//       await this.saleModel.destroy({ where: { detailId: id } });
//       await this.saleModel.create({ sale, detailId: id });
//     } else {
//       await this.saleModel.destroy({ where: { detailId: id } });
//     }

//     if (motorcycles) {
//       await this.motorcycleModel.destroy({ where: { detailId: id } });
//       const motorcycleInstances = motorcycles.map((motorcycle) => ({
//         motorcycle,
//         detailId: id,
//       }));
//       await this.motorcycleModel.bulkCreate(motorcycleInstances);
//     }

//     return this.findOne(id.toString());
//   }
// }

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Detail } from './models/detail.model';
import { Image } from '../images/models/image.model';
import { Color } from '../colors/models/color.module';
import { Year } from '../years/models/years.model';
import { Sale } from '../sales/models/sales.model';
import { Motorcycle } from '../motorcycles/models/motorcycle.model';
import { CreateDetailDTO, UpdateDetailDTO } from './dto';
import { DetailResponseDTO } from './response'; // Доданий імпорт

@Injectable()
export class DetailsService {
  constructor(
    @InjectModel(Detail)
    private readonly detailModel: typeof Detail,
    @InjectModel(Image)
    private readonly imageModel: typeof Image,
    @InjectModel(Color)
    private readonly colorModel: typeof Color,
    @InjectModel(Year)
    private readonly yearModel: typeof Year,
    @InjectModel(Sale)
    private readonly saleModel: typeof Sale,
    @InjectModel(Motorcycle)
    private readonly motorcycleModel: typeof Motorcycle,
  ) {}

  private calculateFinalCost(cost: number, sale?: number): number {
    if (sale) {
      return cost - (cost * sale) / 100;
    }
    return cost;
  }

  private mapDetailToResponse(detail: Detail): DetailResponseDTO {
    const finalCost = this.calculateFinalCost(detail.cost, detail.sale?.sale);
    return {
      id: detail.id,
      name: detail.name,
      about: detail.about,
      material: detail.material,
      weight: detail.weight,
      cost: detail.cost,
      finalCost,
      imgs: detail.imgs.map((img) => img.img),
      colors: detail.colors.map((color) => color.color),
      years: detail.years.map((year) => year.year),
      sale: detail.sale?.sale,
      motorcycles: detail.motorcycles.map(
        (motorcycle) => motorcycle.motorcycle,
      ),
    };
  }

  async findAll(): Promise<DetailResponseDTO[]> {
    const details = await this.detailModel.findAll({
      include: [Image, Color, Year, Sale, Motorcycle],
    });

    return details.map((detail) => this.mapDetailToResponse(detail));
  }

  async findOne(id: string): Promise<DetailResponseDTO> {
    const detail = await this.detailModel.findOne({
      where: { id },
      include: [Image, Color, Year, Sale, Motorcycle],
    });

    if (!detail) {
      throw new BadRequestException('Detail not found');
    }

    return this.mapDetailToResponse(detail);
  }

  async create(createDetailDTO: CreateDetailDTO): Promise<DetailResponseDTO> {
    const {
      name,
      about,
      material,
      weight,
      cost,
      imgs,
      colors,
      years,
      sale,
      motorcycles,
    } = createDetailDTO;

    const detail = await this.detailModel.create({
      name,
      about,
      material,
      weight,
      cost,
    });

    if (imgs) {
      const imageInstances = imgs.map((img) => ({ img, detailId: detail.id }));
      await this.imageModel.bulkCreate(imageInstances);
    }

    if (colors) {
      const colorInstances = colors.map((color) => ({
        color,
        detailId: detail.id,
      }));
      await this.colorModel.bulkCreate(colorInstances);
    }

    if (years) {
      const yearInstances = years.map((year) => ({
        year,
        detailId: detail.id,
      }));
      await this.yearModel.bulkCreate(yearInstances);
    }

    if (sale !== undefined) {
      await this.saleModel.create({ sale, detailId: detail.id });
    }

    if (motorcycles) {
      const motorcycleInstances = motorcycles.map((motorcycle) => ({
        motorcycle,
        detailId: detail.id,
      }));
      await this.motorcycleModel.bulkCreate(motorcycleInstances);
    }

    const createdDetail = await this.findOne(detail.id.toString());
    return createdDetail;
  }

  async remove(id: number): Promise<boolean> {
    await this.imageModel.destroy({ where: { detailId: id } });
    await this.colorModel.destroy({ where: { detailId: id } });
    await this.yearModel.destroy({ where: { detailId: id } });
    await this.saleModel.destroy({ where: { detailId: id } });
    await this.motorcycleModel.destroy({ where: { detailId: id } });

    await this.detailModel.destroy({ where: { id } });
    return true;
  }

  async update(
    id: number,
    updateDetailDTO: UpdateDetailDTO,
  ): Promise<DetailResponseDTO> {
    const {
      name,
      about,
      material,
      weight,
      cost,
      imgs,
      colors,
      years,
      sale,
      motorcycles,
    } = updateDetailDTO;

    const detail = await this.detailModel.findByPk(id);
    if (!detail) {
      throw new BadRequestException('Detail not found');
    }

    await detail.update({
      name,
      about,
      material,
      weight,
      cost,
    });

    if (imgs) {
      await this.imageModel.destroy({ where: { detailId: id } });
      const imageInstances = imgs.map((img) => ({ img, detailId: id }));
      await this.imageModel.bulkCreate(imageInstances);
    }

    if (colors) {
      await this.colorModel.destroy({ where: { detailId: id } });
      const colorInstances = colors.map((color) => ({ color, detailId: id }));
      await this.colorModel.bulkCreate(colorInstances);
    }

    if (years) {
      await this.yearModel.destroy({ where: { detailId: id } });
      const yearInstances = years.map((year) => ({ year, detailId: id }));
      await this.yearModel.bulkCreate(yearInstances);
    }

    if (sale) {
      await this.saleModel.destroy({ where: { detailId: id } });
      await this.saleModel.create({ sale, detailId: id });
    } else {
      await this.saleModel.destroy({ where: { detailId: id } });
    }

    if (motorcycles) {
      await this.motorcycleModel.destroy({ where: { detailId: id } });
      const motorcycleInstances = motorcycles.map((motorcycle) => ({
        motorcycle,
        detailId: id,
      }));
      await this.motorcycleModel.bulkCreate(motorcycleInstances);
    }

    const updatedDetail = await this.findOne(id.toString());
    return updatedDetail;
  }
}
