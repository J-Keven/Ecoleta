import express from "express";
import routes from "./routes";
import { resolve } from "path";
const App = express();

App.use(express.json());
App.use(routes);
App.use(
  "/uploads",
  express.static(resolve(__dirname, "..", "temp", "uploads"))
);
export default App;
