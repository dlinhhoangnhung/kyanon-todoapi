import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from 'express';
import * as bodyParser from "body-parser";
import * as cors from "cors";
import routes from "./routes";
import {User} from "./entity/User";
import {Todo} from "./entity/Todo";

createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root1234",
    database: "kyanon",
    entities: [
        __dirname + "/entity/*.ts"
    ],
    synchronize: false, // set true if run project at first time, then set to false
    logging: false
}).then(async connection => {
    const app = express();
    app.use(cors());
    app.use(bodyParser.json());

    app.use("/", routes);
    require("dotenv").config();

    app.listen(3000, () => {
        console.log("Server started on port 3000!");
      });
    // // here you can start to work with your entities
    // let user = new User();
    // user.fullName = "Dinh Hoang Nhung";

    // user.username = "hoangnhung";
    // user.password = "123456";
    // return connection.manager
    //         .save(user)
    //         .then(user => {
    //             console.log("User has been saved. Photo id is", user.id);  
    //         });
}).catch(error => console.log(error));