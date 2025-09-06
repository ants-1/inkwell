import { folderTypeDefs } from "./typeDefs/folderTypeDef";
import { noteTypeDefs } from "./typeDefs/noteTypeDef";
import { teamTypeDefs } from "./typeDefs/teamTypeDef";
import { userTypeDefs } from "./typeDefs/userTypeDef";

export const typeDefs = [
  userTypeDefs,
  noteTypeDefs,
  folderTypeDefs,
  teamTypeDefs,
];

export default typeDefs;