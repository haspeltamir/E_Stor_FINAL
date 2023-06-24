import express, { request, response } from "express";
import cors from "cors";
const port = 3000;

const app = express();

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"],
  })
);

app.get("/api/services", (request, response) => {
  response.send("hello baby");
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}`);
});
