import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from "typeorm"
import { Restarants } from "./Restaurant.entity"


@Entity('foods')
export class Food extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    foodName: string 

    @Column()
    info: string

    @Column()
    image:string

    @Column()
    cost:string

    @Column()
    type:string

    @ManyToOne(()=> Restarants,(restarant)=> restarant.food,{onDelete:'CASCADE'})
    restarant:Restarants
}
