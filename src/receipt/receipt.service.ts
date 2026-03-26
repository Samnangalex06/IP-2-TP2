import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Receipt } from './receipt.entity';
import { CreateReceiptDto } from './dto/create-receipt.dto';
import { UpdateReceiptDto } from './dto/update-receipt.dto';

@Injectable()
export class ReceiptsService {
  constructor(
    @InjectRepository(Receipt)
    private readonly receiptRepo: Repository<Receipt>,
  ) {}

  async findAll(): Promise<Receipt[]> {
    return await this.receiptRepo.find({ order: { issuedAt: 'DESC' } });
  }

  async findOne(receiptId: string): Promise<Receipt> {
    const receipt = await this.receiptRepo.findOne({ where: { receiptId } });
    if (!receipt) {
      throw new NotFoundException('Receipt not found');
    }
    return receipt;
  }

  async create(dto: CreateReceiptDto): Promise<Receipt> {
    const receipt = this.receiptRepo.create({
      issuedAt: this.parseIssuedAt(dto.issuedAt),
      name: dto.name,
      price: dto.price,
    });
    return await this.receiptRepo.save(receipt);
  }

  async update(receiptId: string, dto: UpdateReceiptDto): Promise<Receipt> {
    const receipt = await this.findOne(receiptId);

    if (dto.issuedAt !== undefined) {
      receipt.issuedAt = this.parseIssuedAt(dto.issuedAt);
    }
    if (dto.name !== undefined) receipt.name = dto.name;
    if (dto.price !== undefined) receipt.price = dto.price;

    return await this.receiptRepo.save(receipt);
  }

  async remove(
    receiptId: string,
  ): Promise<{ deleted: boolean; receiptId: string }> {
    const receipt = await this.findOne(receiptId);
    await this.receiptRepo.remove(receipt);
    return { deleted: true, receiptId };
  }

  private parseIssuedAt(value: string): Date {
    const issuedAt = new Date(value);
    if (Number.isNaN(issuedAt.getTime())) {
      throw new BadRequestException('Invalid issuedAt date');
    }
    return issuedAt;
  }
}
