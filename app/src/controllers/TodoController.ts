import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import moment from "moment";
import jwt from "jsonwebtoken";
import config from "../config/config";
import { Todo } from "../entity/Todo";
import { stat } from "fs";

class TodoController {
  static addTodo = async (req: Request, res: Response) => {
    try {
      let { name, desc, status, deadlineTime, dateCreated } = req.body;

      //Get current time
      let date_ob = new Date();
      let date = ("0" + date_ob.getDate()).slice(-2);
      let month = ("0" + (date_ob.getMonth() + 1)).slice(-2); // current month
      let year = date_ob.getFullYear(); // current year
      let currentDate = date + "-" + month + "-" + year;
      var now = moment(currentDate, "YYYY-MM-DD").toDate();

      let todo = new Todo();
      todo.name = name;
      todo.desc = desc;
      todo.status = status;
      todo.deadlineTime = deadlineTime;
      todo.dateCreated = now;
      todo.dateModified = now;
      await getRepository(Todo).save(todo);
      return res.status(201).json({
        todo,
        message: "Task is added.",
        success: true,
      });
    } catch (e) {
      res.status(409).send("Happen error, check and try again. " + e);
    }
  };

  static updateTodo = async (req: Request, res: Response) => {
    try {
      const { name, desc, deadlineTime, status, userid } = req.body;
      let todo = await getRepository(Todo).findOneOrFail(req.params.id);
      if (todo.status === "complete") {
        res
          .status(400)
          .send("Cannot update this task because it already complete.");
        return;
      }

      //Get current datetime
      let date_ob = new Date();
      let date = ("0" + date_ob.getDate()).slice(-2);
      let month = ("0" + (date_ob.getMonth() + 1)).slice(-2); // current month
      let year = date_ob.getFullYear(); // current year
      let currentDate = date + "-" + month + "-" + year;
      var now = moment(currentDate, "YYYY-MM-DD").toDate();

      todo.name = name;
      todo.desc = desc;
      todo.userid = userid;
      todo.status = status;
      todo.deadlineTime = deadlineTime;
      todo.dateModified = now;
      await getRepository(Todo).save(todo);

      res.status(200).json({
        ...todo,
        message: "Succeed updated.",
        success: true,
      });
    } catch (error) {
      res.status(400).send("Happen error, check and try again. " + error);
      return;
    }
  };

  static removeTodo = async (req: Request, res: Response) => {
    try {
      let todo = await getRepository(Todo).findOneOrFail(req.params.id);
      if (todo.status == "complete") {
        res.status(400).send("Cannot remove complete task.");
        return;
      }
      getRepository(Todo).delete(req.params.id);
      res.status(200).send("Deleted successful");
    } catch (error) {
      res.status(404).send("Happen error, check and try again. " + error);
      return;
    }
  };

  static listAllToDo = async (req: Request, res: Response) => {
    try {
      const todoList = await getRepository(Todo).find({
        select: [
          "id",
          "name",
          "desc",
          "userid",
          "status",
          "deadlineTime",
          "dateCreated",
          "dateModified",
        ],
      });
      res.send(todoList);
    } catch (error) {
      res.status(404).send("Happen error, check and try again. " + error);
    }
  };

  static getOneById = async (req: Request, res: Response) => {
    try {
      const todo = await getRepository(Todo).findOneOrFail(req.params.id, {
        select: [
          "id",
          "name",
          "userid",
          "desc",
          "deadlineTime",
          "status",
          "dateCreated",
          "dateModified",
        ],
      });
      res.status(200).send(todo);
    } catch (error) {
      res.status(404).send("Happen error, check and try again. " + error);
    }
  };

  static assignToDo = async (req: Request, res: Response) => {
    try {
      const { userIdAssign } = req.body;
      const todo = await getRepository(Todo).findOne(req.params.id);

      //Get current datetime
      let date_ob = new Date();
      let date = ("0" + date_ob.getDate()).slice(-2);
      let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
      let year = date_ob.getFullYear();
      let currentDate = date + "-" + month + "-" + year;
      var now = moment(currentDate, "YYYY-MM-DD").toDate();

      console.log(req.user.userId);
      console.log(userIdAssign);
      // Check userId
      if (req.user.userId != userIdAssign) {
        todo.userid = userIdAssign;
        todo.dateModified = now;

        await getRepository(Todo)
          .save(todo)
          .then(() =>
            res.status(200).json({ message: "Assign succeed", success: true })
          )
          .catch((err) => res.status(400).json("Error: " + err));
      } else {
        return res.status(400).json("Task just can be assigned to another user.");
      }
    } catch (error) {
      return res
        .status(400)
        .send("Happen error. Check syntax or token again. " + error);
    }
  };

  static getAllTaskByUserId = async (req: Request, res: Response) => {
    try {
      const todoList = await getRepository(Todo).find({where: { userid: req.params.id }})
        .then((todoList) => {
          if(todoList.length == 0) {
            res.send("No task be assign for this user.");
            return;
          }
            res.send(todoList);
            return;
        });
    } catch (error) {
      res.status(400).send("Happen error. Check userID and try again. " + error);
    }
  };
}

export default TodoController;
