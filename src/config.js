export const baseUrl = `http://crm.ng.lan/api`;

export const getUrl = (path = "/") => `${baseUrl}${path}`;

export const userId = localStorage.getItem("user_id");
