import {Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn} from "typeorm";
import { AlbumMetadataModel, CommentModel, SessionModel } from ".";

@Entity()
export default class User {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ type: "varchar", length: 16, unique: true, nullable: false })
	user_id!: string;

	@Column({ type: "varchar", length: 32, unique: true, nullable: false })
	username!: string;

	@Column({ type: "varchar", length: 128, unique: false, nullable: false })
	password!: string;

	@Column({ type: "varchar", length: 128, unique: true, nullable: false })
	email!: string;

	@Column({ type: "boolean", default: false, nullable: false })
	admin!: boolean;

	@Column({ type: "boolean", default: false, nullable: false })
	banned!: boolean;

	/* relations */

}