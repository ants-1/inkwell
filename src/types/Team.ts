import { Folder } from "./Folder";

export type Team = {
  name: string;
  members: TeamMember[];
  folders: Folder[];
}

export type TeamMember = {
  name: string;
}