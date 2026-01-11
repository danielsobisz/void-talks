import express from "express";
import confessionRoutes from "./routes/confession.routes";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cors from "cors";

const app = express();
const port = 8080;

app.use(express.json());
app.use(helmet());
app.use(cors({ origin: [process.env.APP_URL] }));

app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 20,
  })
);

app.use("/confessions", confessionRoutes);

app.get("/health", (_req, res) => {
  res.json({ status: "OK" });
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
