import React from "react";
import { Button } from "react-bootstrap";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { deleteTask } from "../actions/task";
import dummy from "../assets/dummy.jpg";

const Task = ({title, date, id, editHandler}) => {
  const dispatch = useDispatch();
  return (
    <div className="task">
      <div className="task-left" onClick={()=>editHandler(id)}>
        <img src={dummy} />
        <div>
          <h2>{title}</h2>
          <p>{date}</p>
        </div>
      </div>
      <Button variant="light" onClick={()=>dispatch(deleteTask(id))}>
        <AiOutlineDelete />
      </Button>
    </div>
  );
};

export default Task;
