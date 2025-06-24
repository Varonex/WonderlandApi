import {
	Column,
	Entity,
	CreateDateColumn,
	UpdateDateColumn,
	OneToMany,
	PrimaryColumn
} from "typeorm";
import {Comment} from "./Comment";
import {DBModel} from "../DBModel.ts";

@Entity()
export class User extends DBModel
{
	@PrimaryColumn()
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
