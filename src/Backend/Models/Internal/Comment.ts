import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	ManyToOne, PrimaryColumn,
	UpdateDateColumn
} from "typeorm";
import {User} from "./User";

@Entity()
export class Comment
{
	@PrimaryColumn()
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
