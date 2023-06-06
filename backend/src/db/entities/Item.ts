import { Entity, Property, Unique, ManyToOne } from "@mikro-orm/core";
import { SoftDeletable } from "mikro-orm-soft-delete";
import { DoggrBaseEntity } from "./DoggrBaseEntity.js";
import { User } from "./User.js";

@SoftDeletable(() => Item, "deleted_at", () => new Date())
@Entity()
export class Item {
    // The person who will add the Item
    @ManyToOne({ primary: true })
    owner!: User;

    @Property()
    created_at = new Date();

    @Property({ nullable: true })
    deleted_at?: Date;
}