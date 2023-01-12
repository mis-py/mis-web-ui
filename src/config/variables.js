export const baseUrl = `${
  process.env.NODE_ENV === "development" ? "http://crm.ng.lan/api" : "/api"
}`;

export const currentUserId = localStorage.getItem("user_id");
