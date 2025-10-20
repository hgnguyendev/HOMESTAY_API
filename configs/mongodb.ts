import mongoose from "mongoose";
import sysConfig from "./systemt-configs";

const log = sysConfig.log();

mongoose.Promise = global.Promise;

const uri = sysConfig.mongodb_uri;

if (!uri) {
  log.error("MongoDB URI is undefined. Exiting...");
  process.exit(1);
}
mongoose
  .connect(uri)
  .then(() => {
    log.info("✅ Successfully connected to the mongodb database");
  })
  .catch((err) => {
    log.error("❌ Could not connect to the database. Exiting now...", err);
    process.exit(1);
  });

export default mongoose;
