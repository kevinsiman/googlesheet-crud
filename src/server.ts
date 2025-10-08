import express from "express";
import { routes } from "./routes.js";

const PORT = 3333;
const app = express();

app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`HTTP Server running at port: ${PORT}`);
});
