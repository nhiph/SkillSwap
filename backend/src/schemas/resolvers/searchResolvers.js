const User = require("../../models/User");

const resolvers = {
  Query: {
    searchUsers: async (_, { filters }) => {
      const users = await User.find()
      return users.filter((user) => {
        const matchName = filters?.name
          ? user.name.toLowerCase().includes(filters.name.toLowerCase())
          : true;

        const matchSkill = filters?.skill
          ? user.skills.some((skill) =>
              skill.toLowerCase().includes(filters.skill.toLowerCase())
            )
          : true;

        const matchBio = filters?.bio
          ? user.bio?.toLowerCase().includes(filters.bio.toLowerCase())
          : true;

        const matchLocation = filters?.location
          ? user.location?.some((loc) =>
              loc.toLowerCase().includes(filters.location.toLowerCase())
            )
          : true;

        const matchLanguage = filters?.language
          ? user.language?.some((lang) =>
              lang.toLowerCase().includes(filters.language.toLowerCase())
            )
          : true;

        const matchGender = filters?.gender
          ? user.gender?.toLowerCase().includes(filters.gender.toLowerCase())
          : true;

        const matchExperience = filters?.experiences
          ? user.experiences?.some((exp) =>
              [exp.description, exp.role]
                .join(" ")
                .toLowerCase()
                .includes(filters.experiences.toLowerCase())
            )
          : true;

        return (
          matchName &&
          matchSkill &&
          matchBio &&
          matchLocation &&
          matchLanguage &&
          matchGender &&
          matchExperience
        );
      });
    },
  },
};

module.exports = resolvers;