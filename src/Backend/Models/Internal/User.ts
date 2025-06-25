import {
	Column,
	Entity,
	CreateDateColumn,
	UpdateDateColumn,
	OneToMany,
	PrimaryGeneratedColumn
} from "typeorm";
import {Comment} from "./Comment";
import {BaseModel} from "../BaseModel.ts";

@Entity()
export class User extends BaseModel
{
	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	username!: string;

	@Column()
	age!: number;

	@CreateDateColumn()
	created_at!: Date;

	@UpdateDateColumn()
	updated_at!: Date;

	@OneToMany(() => Comment, comment => comment.user)
	comments!: Comment[];
}
