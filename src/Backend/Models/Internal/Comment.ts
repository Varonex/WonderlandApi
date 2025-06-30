import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	ManyToOne, PrimaryGeneratedColumn,
	UpdateDateColumn
} from "typeorm";
import {User} from "./User";
import {BaseModel} from "../BaseModel.ts";

@Entity({
	name: "comments"
})
export class Comment extends BaseModel
{
	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	content!: string;

	@CreateDateColumn()
	created_at!: Date;

	@UpdateDateColumn()
	updated_at!: Date;

	@DeleteDateColumn()
	deleted_at!: Date|null;

	@ManyToOne(() => User, user => user.comments)
	user!: User;
}
