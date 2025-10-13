import {
	Column,
	Entity,
	CreateDateColumn,
	UpdateDateColumn,
	OneToMany,
	PrimaryGeneratedColumn
} from "typeorm";
import {Comment} from "./Comment";
import {DBEntity} from "../DBEntity.ts";

@Entity({
	name: "users"
})
export class User extends DBEntity
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
