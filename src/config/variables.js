export const baseUrl = `${
  process.env.NODE_ENV === "development" ? "http://localhost:8000/api" : "/api"
  // "http://dev.ng.lan/api"
}`;
