export default function (state = { tasks: [] }, action) {
  const { type, payload } = action;

  switch (type) {
    case "GET_TASKS":
      return {
        ...state,
        loading: true,
      };
    case "GET_TASKS_SUCCESS":
      return {
        ...state,
        loading: false,
        tasks: payload,
      };
    case "GET_TASKS_FAIL":
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case "SAVE_TASKS":
      return {
        ...state,
        loading: true,
      };
    case "SAVE_TASKS_SUCCESS":
      return {
        ...state,
        tasks: [...state.tasks, payload],
      };
    case "UPDATE_TASK_SUCCESS":
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id != payload.id) return task
          else return payload.data
        }),
      };
    case "DELETE_TASKS_SUCCESS":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id != payload),
      };

    default:
      return state;
  }
}
