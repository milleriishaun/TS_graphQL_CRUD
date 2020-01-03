import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";

// specify class with ObjectType decorator for graphQL
@ObjectType()
@Entity()
export class Movie extends BaseEntity {
  // graphQL type and DB type through decorators
  @Field(() => Int) // for specification for graphQL
  @PrimaryGeneratedColumn() // for specification for DB
  id: number;

  @Field()
  @Column()
  title: string;

  @Field(() => Int)
  @Column("int", { default: 60 })
  minutes: number;
}
