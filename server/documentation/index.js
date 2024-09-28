import path from "path";
import express from "express";
import swaggerUI from "swagger-ui-express";
import YAML from "yamljs";

// load api.yaml file, which is in the root directory of our project, as a JavaScript object
const swaggerJsDocs = YAML.load(path.resolve("openapi.yaml"));

const app = express();

const port = 8088;

// setup docs from our specification file and serve on the /docs route
app.use("/", swaggerUI.serve, swaggerUI.setup(swaggerJsDocs));

app.listen(port, () => {
  console.log(`Listening on port ${port} `);
});
