import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Company } from 'src/@generated/company/company.model';
import { PrismaService } from '../../core/services/prisma.service';

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}
  async findById(id: string): Promise<Company> {
    try {
      const company = await this.prisma.company.findFirstOrThrow({ where: { id } });

      return company;
    } catch (error) {
      Logger.error(error);
      throw new NotFoundException(`Company with ID ${id} not found`);
    }
  }
}
