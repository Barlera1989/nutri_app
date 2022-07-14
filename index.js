import express from "express";
import bodyParser from "body-parser";
import routes from "./routes/index.js";
import mongoose from "mongoose";
import { mongo } from "./config/dev.js";

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

mongoose.connect(mongo.mongoURI);

app.use(routes);

app.listen(5002, () => {
  console.log("listen to 5002");
});
