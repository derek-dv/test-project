import axios from "axios";

const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NjEzMzQyNjcsIm5iZiI6MTY2MTMzNDI2NywianRpIjoiNWQyM2ZjNDQtYjE2Yi00NjFlLTk2ODEtNWI4NmYwYjNjMDc2IiwiaWRlbnRpdHkiOnsibmFtZSI6IlN1bmRhciBQaWNoYWkiLCJlbWFpbCI6InNtaXRod2lsbHMxOTg5QGdtYWlsLmNvbSIsInVzZXJfaWQiOiJ1c2VyXzRlZTRjZjY3YWQ0NzRhMjc5ODhiYzBhZmI4NGNmNDcyIiwiaWNvbiI6Imh0dHA6Ly93d3cuZ3JhdmF0YXIuY29tL2F2YXRhci9jZjk0Yjc0YmQ0MWI0NjZiYjE4NWJkNGQ2NzRmMDMyYj9kZWZhdWx0PWh0dHBzJTNBJTJGJTJGczMuc2xvb3ZpLmNvbSUyRmF2YXRhci1kZWZhdWx0LWljb24ucG5nIiwiYnlfZGVmYXVsdCI6Im91dHJlYWNoIn0sImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyJ9.FTlsQshteZbkk7ie8d8UpOZWbnI23elURzGpfiVr0X0";
const companyId = "company_413ef22b6237417fb1fba7917f0f69e7";

export const getUsers = () => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  dispatch({
    type: "GET_USERS",
  });

  try {
    const res = await axios.get(
      `https://stage.api.sloovi.com/team?product=outreach&company_id=${companyId}`,
      config
    );
    dispatch({
      type: "GET_USERS_SUCCESS",
      payload: res.data.results.data,
    });
  } catch (err) {
    dispatch({
      type: "GET_USERS_FAIL",
      payload: err.message,
    });
    console.error(err);
  }
};
