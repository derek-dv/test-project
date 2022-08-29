
import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import task from "./reducers/task";
import user from "./reducers/user";

const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
  tasks: task,
  users: user,
});

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;