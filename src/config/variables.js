export const baseUrl = `${
  process.env.NODE_ENV === "development" ? "http://10.10.102.3:8000/api" : "/api"
  // "http://dev.ng.lan/api"
}`;
