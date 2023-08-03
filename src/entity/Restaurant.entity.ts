import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm"
import { Food } from "./Food.entity"


@Entity('restaurants')
export class Restarants extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    restarantName: string

    @Column()
    info: string

    @Column()
    image: string

    @OneToMany(() => Food, (food) => food.restarant,{cascade:true})
    food: Food[]
}
