const User = require("../../models/User");

const resolvers = {
  Query: {
    searchUsers: async (_, { filters }) => {
      const query = {};

      // Keyword search in name, bio, position, or workplace
      if (filters.keywordSearch) {
        const regex = new RegExp(filters.keywordSearch, "i");
        query.$or = [
          { name: regex },
          { bio: regex },
          { position: regex },
          { workplace: regex },
        ];
      }

      // Gender (exact match, case-insensitive)
      if (filters.gender) {
        query.gender = new RegExp(`^${filters.gender}$`, "i");
      }

      // Skills (skills the user teaches)
      if (filters.skills?.length) {
        query.skills = { $in: filters.skills };
      }

      // Categories (same as skillsToLearn?)
      if (filters.categories?.length) {
        query.skillsToLearn = { $in: filters.categories };
      }

      // Languages
      if (filters.languages?.length) {
        query.language = { $in: filters.languages };
      }

      const users = await User.find(query);
      return users;
    },
  },
};

module.exports = resolvers;
