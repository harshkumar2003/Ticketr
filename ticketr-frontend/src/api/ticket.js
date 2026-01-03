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

export const allTickets = () => {
  return api.get("/tickets", {
    withCredentials: true,
  });
};

export const assignTicket = (ticketId, userId) => {
  return api.put(
    `/tickets/${ticketId}/assign/${userId}`,
    {},
    { withCredentials: true },
  );
};

export const markTicketResolved = (ticketId) => {
  return api.put(`/tickets/${ticketId}/resolve`, null, {
    withCredentials: true,
  });
};
