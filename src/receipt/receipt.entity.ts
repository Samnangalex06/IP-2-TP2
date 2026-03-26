import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'receipts' })
export class Receipt {
  @PrimaryGeneratedColumn('uuid')
  receiptId: string;

  @Column({ type: 'timestamp' })
  issuedAt: Date;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'float' })
  price: number;
}
