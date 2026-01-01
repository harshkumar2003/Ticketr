package com.app.ticketr_backend.repository;

import com.app.ticketr_backend.model.Ticket;
import com.app.ticketr_backend.model.TicketStatus;
import com.app.ticketr_backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface Ticketrepo extends JpaRepository<Ticket,Long> {

    List<Ticket> findByCreatedBy(User user);

    List<Ticket> findByAssignedTo(User user);

    List<Ticket> findByStatus(TicketStatus status);

    List<Ticket> findByCreatedByAndStatus(User user,TicketStatus status);

}
