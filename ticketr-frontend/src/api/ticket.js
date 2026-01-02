import api from "./api";

export const createTickets = (title, description, priority) => {
  return api.post(
    "/tickets/create",
    { title, description, priority },
    {
      withCredentials: true,
    },
  );
};

export const myTicket = () => {
  return api.get("/tickets/my", {
    withCredentials: true,
  });
};
