import "reflect-metadata";
import {createConnection} from "typeorm";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "./routes";
import {User} from "./entity/User";
import {Todo} from "./entity/Todo";

createConnection({
    type: "mysql",
    host: "mysqldb",
    port: 3306,
    username: "root",
    password: "root1234",
    database: "kyanon",
    entities: [
        __dirname + "/entity/*.ts"
    ],
    synchronize: true, // set true if run project at first time, then set to false
    logging: false
}).then(async connection => {
    const app = express();
    app.use(cors());
    app.use(bodyParser.json());

    app.use("/", routes);
    require("dotenv").config();

    app.listen(8080, () => {
        console.log("Server started on port 3000!");
      });
    
}).catch(error => console.log(error));