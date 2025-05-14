require("dotenv").config();
const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge');

const connectDB = require("./config/db");
const { authMiddleware } = require("./middlewares/auth");

const PORT = process.env.PORT || 4000;

// Import your modular schemas
const userTypeDefs = require('./schemas/typeDefs/userTypeDefs');
const searchTypeDefs = require('./schemas/typeDefs/searchTypeDefs');

const userResolvers = require('./schemas/resolvers/userResolvers');
const searchResolvers = require('./schemas/resolvers/searchResolvers');

// Merge them
const typeDefs = mergeTypeDefs([userTypeDefs, searchTypeDefs]);
const resolvers = mergeResolvers([userResolvers, searchResolvers]);

async function startServer() {
  await connectDB(); // 👉 Kết nối DB trước khi server start

  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  // 👉 Setup middlewares
  app.use(cors({
    origin: 'http://localhost:5173',   // ✅ explicitly allow Vite dev server
    credentials: true                  // ✅ allow cookies or auth headers
  }));
  app.use(bodyParser.json()); // hoặc app.use(express.json());

  // 👉 Apollo Middleware + context
  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req }) => {
        // Gọi middleware kiểm tra JWT nếu cần
        const user = await authMiddleware(req);
        return { user };
      },
    })
  );

  // 👉 Start listening
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
  });
}

startServer();
