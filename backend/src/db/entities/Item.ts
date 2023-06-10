import {Entity, ManyToOne, OneToMany, Property} from "@mikro-orm/core";
import {SoftDeletable} from "mikro-orm-soft-delete";
import {ItemOwner} from "./ItemOwner.js";
// removed import for DoggerBaseEntity file
import {User} from "./User.js";

@SoftDeletable(() => Item, "deleted_at", () => new Date())
@Entity()
export class Item {
    // The person who will add the Item
    @ManyToOne({ primary: true })
    owner!: User;
    
    //The person who will sell the Item
    @ManyToOne(() => ItemOwner)
    author!: ItemOwner;
    
    created_at = new Date();

    @Property({ nullable: true })
    deleted_at?: Date;
}
