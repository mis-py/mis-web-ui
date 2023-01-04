export const baseUrl = `https://crm.nullgravity.net/api`;

export const getUrl = (path = "/") => `${baseUrl}${path}`;

export const userId = localStorage.getItem("user_id");