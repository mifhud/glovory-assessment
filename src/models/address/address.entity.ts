import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BeforeInsert,
  BeforeUpdate,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity';

@Entity('address')
export class Address extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne((type) => User, (user) => user.id, {
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'user_id' })
  user_id: User;

  @Column({ type: 'text', nullable: false })
  address: string;

  @Column({ type: 'varchar', length: 200, nullable: false })
  city: string;

  @Column({ type: 'timestamp with time zone' })
  createdAt: Date;

  @Column({ type: 'timestamp with time zone', nullable: true })
  updatedAt: Date;

  @BeforeInsert()
  createDate() {
    this.createdAt = new Date();
  }

  @BeforeUpdate()
  updateDate() {
    this.updatedAt = new Date();
  }
}
