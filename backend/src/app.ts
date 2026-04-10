import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";

const app: Application = express();

app.use(morgan("dev"));
app.use(
  cors({
    origin: "http:localhost:5001",
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ message: 'Hello World - Authentication Server' });
});

export default app;
