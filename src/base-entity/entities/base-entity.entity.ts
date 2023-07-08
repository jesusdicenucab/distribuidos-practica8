import { BaseEntityStatus } from "src/types/types";
import { Check, Column, PrimaryGeneratedColumn } from "typeorm";

export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({type: 'text'})
  status: BaseEntityStatus;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_date: Date;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  deleted_date: Date;
  @Check(`status in ('enabled', 'disabled')`)
  statusCheck: boolean;

  // public constructor(status: BaseEntityStatus, created_date: Date, deleted_date: Date) {
  //   this.status = status;
  //   this.created_date = created_date;
  //   this.deleted_date = deleted_date;
  // }

}
