import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("packages")
export class PackageEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  packageName!: string;

  @CreateDateColumn()
  importedAt!: Date;
}
