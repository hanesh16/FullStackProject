import {Cascade, Collection, Entity, Enum, OneToMany, Property, Unique} from "@mikro-orm/core";
import {SoftDeletable} from "mikro-orm-soft-delete";
import {DoggrBaseEntity} from "./DoggrBaseEntity.js";
import {Item} from "./Item.js";
import {Message} from "./Message.js";

//Removed import for entity Pass

export enum UserRole {
	ADMIN = 'Admin',
	USER = 'User'
}

// https://github.com/TheNightmareX/mikro-orm-soft-delete
// Yes, it's really that easy.
@SoftDeletable(() => User, "deleted_at", () => new Date())
@Entity({ tableName: "users"})
export class User extends DoggrBaseEntity {
	@Property()
	@Unique()
	email!: string;
	
	@Property()
	name!: string;
	
	@Property()
	itemName!: string;

	@Property()
	password!: string;
	
	@Property()
	campusName!: string;
	
	@Enum(() => UserRole)
	role!: UserRole; // string enum

	@Property({fieldName: 'img_uri'})
	imgUri!: string;

	// Note that these DO NOT EXIST in the database itself!
	@OneToMany(
		() => Item,
		item => item.owner,
		{cascade: [Cascade.PERSIST, Cascade.REMOVE]}
	)
	items!: Collection<Item>;

	@OneToMany(
		() => Item,
		item => item.author,
		{cascade: [Cascade.PERSIST, Cascade.REMOVE]}
	)
	added_by!: Collection<Item>;

	//To Add Item upload entity logic and logic for filter items
	


	// Orphan removal used in our Delete All Sent Messages route to single-step remove via Collection
	@OneToMany(
		() => Message,
		message => message.sender,
		{cascade: [Cascade.PERSIST, Cascade.REMOVE], orphanRemoval: true}
	)
	messages_sent!: Collection<Message>;

	@OneToMany(
		() => Message,
		message => message.receiver,
		{cascade: [Cascade.PERSIST, Cascade.REMOVE], orphanRemoval: true}
	)
	messages_received!: Collection<Message>;
}
