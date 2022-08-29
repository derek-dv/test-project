import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Button, Form, InputGroup } from "react-bootstrap";
import { AiFillCalendar } from "react-icons/ai";
import Task from "./components/Task";
import { getTasks, saveTask, updateTask } from "./actions/task";
import { getUsers } from "./actions/user";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [taskTime, setTaskTime] = useState("");
  const [userId, setUserId] = useState("1");
  const [id, setId] = useState("");
  const [isNew, setIsNew] = useState(true);
  const dispatch = useDispatch();
  const taskState = useSelector((state) => state.tasks);
  const userState = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getTasks());
    dispatch(getUsers());
    if (userState?.users?.id) {
      console.log(userState);
      setUserId(userState.users[0].id);
    }
  }, [dispatch]);

  const addTask = () => {
    var date1 = new Date("08/05/2015 00:00:00");
    var date2 = new Date(`08/05/2015 ${taskTime}:00`);
    if (date2 < date1) {
      date2.setDate(date2.getDate() + 1);
    }

    var diff = date2 - date1;
    console.log(diff);
    dispatch(
      saveTask({
        assigned_user: userId,
        is_completed: 0,
        task_date: taskDate,
        task_msg: taskName,
        time_zone: Number("3600"),
        task_time: Number(Math.floor(diff / 1000)),
      })
    );
    setShowForm(false);
  };

  const update = () => {
    var date1 = new Date("08/05/2015 00:00:00");
    var date2 = new Date(`08/05/2015 ${taskTime}:00`);
    if (date2 < date1) {
      date2.setDate(date2.getDate() + 1);
    }

    var diff = date2 - date1;
    console.log(diff);
    dispatch(
      updateTask(id, {
        assigned_user: userId,
        is_completed: 0,
        task_date: taskDate,
        task_msg: taskName,
        time_zone: Number("3600"),
        task_time: Number(Math.floor(diff / 1000)),
      })
    );
    setShowForm(false);
  };
  const edit = (id) => {
    setIsNew(false);
    let task = taskState.tasks.filter((task) => task.id == id);
    if (task.length > 0) {
      task = task[0];
      let date = moment("12:00:00 AM", "h:mm:ss A")
        .add(Math.ceil(task.task_time), "seconds")
        .format("HH:mm");
      console.log(date);
      setTaskName(task.task_msg);
      setTaskDate(task.task_date);
      setUserId(task.user_id);
      setTaskTime(date);
      setId(task.id);
    }
    setShowForm(true);
  };

  return (
    <div style={{ height: "100vh" }}>
      <Row style={{ height: "100%", width: "100%" }}>
        <Col className="left" sm="2" md="2">
          1
        </Col>
        <Col className="p-0 m-0">
          <div className="shadow-3 top-white"></div>
          <div className="main">
            <div className="main-top">
              <h1>Task {taskState.tasks.length || "0"}</h1>
              <Button
                variant="light"
                onClick={() => {
                  setIsNew(true);
                  setShowForm(true);
                  setTaskName("");
                  setTaskDate("");
                  setTaskTime("");
                  setUserId(1);
                }}
              >
                +
              </Button>
            </div>
            {!showForm ? (
              <div>
                {taskState.tasks.map((task) => (
                  <Task
                    editHandler={edit}
                    title={task.task_msg}
                    date={task.task_date}
                    id={task.id}
                  />
                ))}
              </div>
            ) : (
              <form>
                <Form.Label htmlFor="description">Task description</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    id="description"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                  />
                  <InputGroup.Text>
                    <AiFillCalendar />
                  </InputGroup.Text>
                </InputGroup>
                <Row>
                  <Col>
                    <Form.Label htmlFor="date">Date</Form.Label>
                    <InputGroup className="mb-3">
                      <Form.Control
                        id="date"
                        type="date"
                        value={taskDate}
                        onChange={(e) => setTaskDate(e.target.value)}
                      />
                    </InputGroup>
                  </Col>
                  <Col>
                    <Form.Label htmlFor="time">Time</Form.Label>
                    <InputGroup className="mb-3">
                      <Form.Control
                        id="time"
                        type="time"
                        value={taskTime}
                        required
                        onChange={(e) => setTaskTime(e.target.value)}
                      />
                    </InputGroup>
                  </Col>
                </Row>
                <Form.Label htmlFor="assigned">Assigned user</Form.Label>
                {userState.users && (
                  <Form.Select
                    id="assigned"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                  >
                    <option value={1}>Please select</option>
                    {userState.users.map((user) => (
                      <option value={user.id}>{user.name}</option>
                    ))}
                  </Form.Select>
                )}
                {taskState.loading && <p>Loading</p>}
                <div className="buttons mt-5">
                  <div></div>
                  <div>
                    <Button variant="light" onClick={() => setShowForm(false)}>
                      Cancel
                    </Button>{" "}
                    {isNew ? (
                      <Button variant="success" onClick={addTask}>
                        Save
                      </Button>
                    ) : (
                      <Button variant="success" onClick={update}>
                        Edit
                      </Button>
                    )}
                  </div>
                </div>
              </form>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default App;
