import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fullname: string;

    @Column({unique: true})
    email:string;

}