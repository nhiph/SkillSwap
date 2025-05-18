const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const { generateToken } = require("../../utils/jwt");
const { sendActivationEmail } = require("../../utils/mailer"); // You should implement this function to send emails

const resolvers = {
  Query: {
    me: async (_, __, { user }) => {
      if (!user) throw new Error("Unauthorized");
      return await User.findById(user.id);
    },
    getUsers: async () => await User.find(),
    getUser: async (_, { id }) => await User.findById(id),
  },
  Mutation: {
    register: async (
      _,
      {
        name,
        email,
        password,
        skills,
        skillsToLearn,
        bio,
        avatar,
        location,
        language,
        experiences,
        pronouns,
        position,
        age,
        workplace,
      }
    ) => {
      const hashed = await bcrypt.hash(password, 10);
      const activationToken = generateToken(email); // Token for email activation
      const user = await User.create({
        name,
        email,
        password: hashed,
        skills,
        skillsToLearn,
        bio,
        activationToken,
        avatar,
        location,
        language,
        experiences,
        pronouns,
        position,
        age,
        workplace,
      });

      // Send activation email (you need to implement this function)
      await sendActivationEmail(user.email, activationToken);

      return { token: generateToken(user._id), user };
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error("Invalid credentials");
      }
      // if (!user.isActive) {
      //   throw new Error("Account not activated. Please check your email.");
      // }
      const token = generateToken(user._id);
      return { token, user };
    },
  
    updateUser: async (
      _,
      {
        id,
        name,
        skills,
        skillsToLearn,
        bio,
        experiences,
        location,
        language,
        avatar,
        pronouns,
        position,
        age,
        workplace,
      },
      { user }
    ) => {
      if (!user || user.id !== id) throw new Error("Unauthorized");
      return await User.findByIdAndUpdate(
        id,
        {
          name,
          skills,
          skillsToLearn,
          bio,
          experiences,
          location,
          language,
          avatar,
          pronouns,
          position,
          age,
          workplace,
        },
        { new: true }
      );
    },
    deleteUser: async (_, { id }, { user }) => {
      if (!user || user.id !== id) throw new Error("Unauthorized");
      await User.findByIdAndDelete(id);
      return true;
    },
    activateUser: async (_, { activationToken }) => {
      const user = await User.findOne({ activationToken });
      if (!user) throw new Error("Invalid or expired activation token.");

      // Set the user as active
      user.isActive = true;
      user.activationToken = undefined; // Clear the token after activation
      await user.save();

      return true;
    },
  },
};

module.exports = resolvers;
