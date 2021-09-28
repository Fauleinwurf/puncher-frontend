import {Category} from './category'
import {User} from "./user";

export interface Entry {
 id: number;
 checkIn: Date;
 checkOut: Date;
 category: Category;
 user: User;
}

