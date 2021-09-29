import {User} from "./user";
import {Project} from "./project";

export interface Entry {
  id: number;
  checkIn: Date;
  checkOut: Date;
  project: Project;
  user: User;
}

