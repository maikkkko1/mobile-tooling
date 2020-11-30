const BASE = "http://localhost:5489/api/v1";

const Endpoints = {
  GET_ANALYTICS_EVENTS: BASE + "/firebase/analytics/get",
  GET_PREFERENCES: BASE + "/preference/get",
  GET_REQUESTS: BASE + "/request/get",
  CLEAR_REQUESTS: BASE + "/request/clear",
};

export default Endpoints;
