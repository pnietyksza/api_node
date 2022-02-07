import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, PrimaryColumn} from "typeorm";

@Entity()
export class List extends BaseEntity{

    @PrimaryColumn()
    nameOfList: string;

    @Column("simple-array")
    filmsIds: number[];
}
