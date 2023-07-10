import { BaseEntityStatus } from "src/types/types";
import { Check, Column, PrimaryGeneratedColumn } from "typeorm";

export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({type: 'text', default: 'enabled'})
  status: BaseEntityStatus;
  @Column({ name: 'created_date', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdDate: Date;
  @Column({ name: 'deleted_date',type: 'timestamp', nullable: true})
  deletedDate: Date;
  @Check(`status in ('enabled', 'disabled')`)
  statusCheck: boolean;

  // public constructor(status: BaseEntityStatus, created_date: Date, deleted_date: Date) {
  //   this.status = status;
  //   this.created_date = created_date;
  //   this.deleted_date = deleted_date;
  // }

}
