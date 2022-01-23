import { Router } from "express";
import TodoController from "../controllers/TodoController";
import { Todo } from "../entity/Todo";
import { checkJwt } from "../middlewares/checkJwt";

const router = Router();

router.route("/")
    .get(checkJwt, TodoController.listAllToDo) // get all Todo
    .post(checkJwt, TodoController.addTodo) // create Todo

router.route("/:id([0-9]+)")
    .get(checkJwt, TodoController.getOneById) // get one Todo
    .patch(checkJwt, TodoController.updateTodo) // update Todo
    .delete(checkJwt, TodoController.removeTodo) // delete Todo
    .post(checkJwt, TodoController.assignToDo) // assign Todo

router.get("/user-task/:id", checkJwt, TodoController.getAllTaskByUserId) // get all task of user by id

export default router;
