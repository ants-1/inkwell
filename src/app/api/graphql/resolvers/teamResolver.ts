import folderModel from "../models/folderModel";
import teamModel from "../models/teamModel";

export const teamResolvers = {
  Query: {
    teams: async (_: any, { userId }: any) => {
      try {
        return await teamModel
          .find({ "members.user": userId })
          .populate({
            path: "members.user",
            model: "UserModel",
            select: "username",
          })
          .populate({
            path: "folders",
            populate: {
              path: "notes",
              model: "NoteModel",
            },
          });
      } catch (error: any) {
        throw new Error("Failed to fetch teams:", error);
      }
    },
    myTeam: async (_: any, { userId }: any) => {
      try {
        return await teamModel
          .findOne({
            teamType: "default",
            members: { $elemMatch: { user: userId, role: "host" } },
          })
          .populate("folders")
          .populate("members.user");
      } catch (error: any) {
        throw new Error("Failed to fetch user’s team:", error.message);
      }
    },
  },
  Mutation: {
    createDefaultTeam: async (_: any, { input }: any) => {
      try {
        const folderIds = [];

        // Create default folder
        const defaultFolder = await folderModel.create({
          name: "General",
          notes: [],
        });
        folderIds.push(defaultFolder._id);

        // Create memebers with creator as host
        const members = [
          {
            user: input.userId,
            role: "host",
          },
        ];

        // Create team
        const newTeam = await teamModel.create({
          name: input.name,
          members,
          folders: [defaultFolder._id],
          teamType: "default",
        });

        await newTeam.populate([{ path: "folders" }, { path: "members.user" }]);

        return newTeam;
      } catch (error: any) {
        console.log(error);
        throw new Error("Failed to create team:", error.message);
      }
    },
    createTeam: async (_: any, { input }: any) => {
      try {
        const members = [{ user: input.userId, role: "host" }];

        const newTeam = await teamModel.create({
          name: input.name,
          members,
          teamType: "custom",
          folders: [],
        });

        await newTeam.populate([{ path: "folders" }, { path: "members.user" }]);
        return newTeam;
      } catch (error: any) {
        throw new Error("Failed to create team: " + error.message);
      }
    },
    editTeam: async (_: any, { teamId, name, teamType, userId }: any) => {
      try {
        const team = await teamModel.findById(teamId);
        if (!team) throw new Error("Team not found");

        const host = team.members.find(
          (m: any) => m.user.toString() === userId && m.role === "host"
        );
        if (!host) throw new Error("Only the host can edit this team");

        const updatedTeam = await teamModel
          .findByIdAndUpdate(
            teamId,
            { ...(name && { name }), ...(teamType && { teamType }) },
            { new: true }
          )
          .populate("folders")
          .populate("members.user");

        return updatedTeam;
      } catch (error: any) {
        throw new Error("Failed to edit team: " + error.message);
      }
    },
    deleteTeam: async (_: any, { teamId, userId }: any) => {
      try {
        const team = await teamModel.findById(teamId);
        if (!team) throw new Error("Team not found");

        const host = team.members.find(
          (m: any) => m.user.toString() === userId && m.role === "host"
        );
        if (!host) throw new Error("Only the host can delete this team");

        await folderModel.deleteMany({ _id: { $in: team.folders } });
        await teamModel.findByIdAndDelete(teamId);

        return true;
      } catch (error: any) {
        throw new Error("Failed to delete team: " + error.message);
      }
    },
    addMember: async (_: any, { teamId, member }: any) => {
      try {
        const team = await teamModel
          .findByIdAndUpdate(
            teamId,
            {
              $push: {
                members: { user: member.userId, role: member.role || "member" },
              },
            },
            { new: true }
          )
          .populate("folders")
          .populate("members.user");

        if (!team) {
          throw new Error("Team not found");
        }

        return team;
      } catch (error: any) {
        throw new Error("Failed to add member to team:", error.message);
      }
    },
    removeMember: async (_: any, { teamId, userId }: any) => {
      try {
        const team = await teamModel
          .findByIdAndUpdate(
            teamId,
            { $pull: { members: { user: userId } } },
            { new: true }
          )
          .populate("folders")
          .populate("members.user");

        if (!team) throw new Error("Team not found");
        return team;
      } catch (error: any) {
        throw new Error("Failed to remove member: " + error.message);
      }
    },
  },
};
