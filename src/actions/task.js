import axios from "axios";

const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NjEzMzQyNjcsIm5iZiI6MTY2MTMzNDI2NywianRpIjoiNWQyM2ZjNDQtYjE2Yi00NjFlLTk2ODEtNWI4NmYwYjNjMDc2IiwiaWRlbnRpdHkiOnsibmFtZSI6IlN1bmRhciBQaWNoYWkiLCJlbWFpbCI6InNtaXRod2lsbHMxOTg5QGdtYWlsLmNvbSIsInVzZXJfaWQiOiJ1c2VyXzRlZTRjZjY3YWQ0NzRhMjc5ODhiYzBhZmI4NGNmNDcyIiwiaWNvbiI6Imh0dHA6Ly93d3cuZ3JhdmF0YXIuY29tL2F2YXRhci9jZjk0Yjc0YmQ0MWI0NjZiYjE4NWJkNGQ2NzRmMDMyYj9kZWZhdWx0PWh0dHBzJTNBJTJGJTJGczMuc2xvb3ZpLmNvbSUyRmF2YXRhci1kZWZhdWx0LWljb24ucG5nIiwiYnlfZGVmYXVsdCI6Im91dHJlYWNoIn0sImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyJ9.FTlsQshteZbkk7ie8d8UpOZWbnI23elURzGpfiVr0X0";
const companyId = "company_413ef22b6237417fb1fba7917f0f69e7";

export const getTasks = () => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  dispatch({
    type: "GET_TASKS",
  });

  try {
    const res = await axios.get(
      `https://stage.api.sloovi.com/task/lead_465c14d0e99e4972b6b21ffecf3dd691?company_id=${companyId}`,
      config
    );
    dispatch({
      type: "GET_TASKS_SUCCESS",
      payload: res.data.results,
    });
  } catch (err) {
    dispatch({
      type: "GET_TASKS_FAIL",
      payload: err.message,
    });
    console.error(err);
  }
};

export const updateTask = (id, data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  dispatch({
    type: "GET_TASK",
  });
  const body = JSON.stringify(data);

  try {
    const res = await axios.put(
      `https://stage.api.sloovi.com/task/lead_465c14d0e99e4972b6b21ffecf3dd691/${id}?company_id=${companyId}`,
      body,
      config
    );
    console.log(res);
    dispatch({
      type: "UPDATE_TASK_SUCCESS",
      payload: { data: res.data.results, id },
    });
  } catch (err) {
    dispatch({
      type: "UPDATE_TASK_FAIL",
      payload: err.message,
    });
    console.error(err);
  }
};

export const deleteTask = (id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  dispatch({
    type: "DELETE_TASKS",
  });

  try {
    const res = await axios.delete(
      `https://stage.api.sloovi.com/task/lead_465c14d0e99e4972b6b21ffecf3dd691/${id}?company_id=${companyId}`,
      config
    );
    dispatch({
      type: "DELETE_TASKS_SUCCESS",
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: "DELETE_TASKS_FAIL",
      payload: err.message,
    });
    console.error(err);
  }
};

export const saveTask =
  (
    data = {
      task_date: "",
      assigned_user: "",
      is_completed: "",
      task_time: "",
      time_zone: "",
      task_msg: "",
    }
  ) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    dispatch({
      type: "SAVE_TASKS",
    });

    const body = JSON.stringify(data);

    try {
      const res = await axios.post(
        `https://stage.api.sloovi.com/task/lead_465c14d0e99e4972b6b21ffecf3dd691?company_id=${companyId}`,
        body,
        config
      );
      console.log(res);
      dispatch({
        type: "SAVE_TASKS_SUCCESS",
        payload: res.data.results,
      });
    } catch (err) {
      dispatch({
        type: "SAVE_TASKS_FAIL",
        payload: err.message,
      });
      console.error(err);
    }
  };
