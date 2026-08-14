import app from "./app.js";
import config from "./config/config.js";
import connectDatabase from "./config/database.js";

const startServer = async () => {
  try {
    await connectDatabase();

    app.listen(config.server.port, () => {
      console.log(`Server running on http://localhost:${config.server.port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);

    process.exit(1);
  }
};

startServer();
