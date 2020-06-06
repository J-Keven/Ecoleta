import express from "express";
import cors from "cors";
import routes from "./routes";
import { resolve } from "path";

import logMiddleware from "./middlewares/log";

const App = express();

App.use(cors());
App.use(express.json());
App.use(logMiddleware);
App.use(routes);
App.use(
  "/uploads",
  express.static(resolve(__dirname, "..", "temp", "uploads"))
);

export default App;
