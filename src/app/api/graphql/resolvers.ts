import { folderResolvers } from "./resolvers/folderResolver";
import { noteResolvers } from "./resolvers/noteResolver";
import { teamResolvers } from "./resolvers/teamResolver";
import { userResolvers } from "./resolvers/userResolver";

const resolvers = [
  userResolvers,
  teamResolvers,
  folderResolvers,
  noteResolvers
];

export default resolvers;