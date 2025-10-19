import express from "express";
import confessionRoutes from "./routes/confession.routes";

const app = express();
const port = 8080;

app.use(express.json());

app.use("/confessions", confessionRoutes);

app.get("/health", (_req, res) => {
  res.json({ status: "OK" });
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
