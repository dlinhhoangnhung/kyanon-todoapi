import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

export type Status = "new" | "complete"

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 50, unique: true })
  name: string;

  @Column({ type: "varchar", length: 500 })
  desc: string;

  @Column({nullable: true})
  userid: String;

  @Column()
  deadlineTime: Date; 

  @Column({type: "enum", enum: ["new", "complete"]})
  status: Status; 

  @Column()
  dateCreated: Date;

  @Column()
  dateModified: Date;

}
