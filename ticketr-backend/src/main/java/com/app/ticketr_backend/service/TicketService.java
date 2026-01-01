package com.app.ticketr_backend.service;

import com.app.ticketr_backend.dto.response.TicketResponse;
import com.app.ticketr_backend.exception.AccessDeniedException;
import com.app.ticketr_backend.exception.InvalidOperationException;
import com.app.ticketr_backend.exception.ResourceNotFoundException;
import com.app.ticketr_backend.model.Ticket;
import com.app.ticketr_backend.model.TicketPriority;
import com.app.ticketr_backend.model.TicketStatus;
import com.app.ticketr_backend.model.User;
import com.app.ticketr_backend.repository.Ticketrepo;
import com.app.ticketr_backend.repository.Userrepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TicketService
{
    private final Userrepo userrepo;
    private final Ticketrepo ticketrepo;

    public TicketService(Userrepo userrepo,Ticketrepo ticketrepo)
    {
        this.ticketrepo = ticketrepo;
        this.userrepo = userrepo;
    }

    private TicketResponse mapToResposne(Ticket ticket)
    {
        return new TicketResponse(
                ticket.getId(),
                ticket.getTitle(),
                ticket.getDescription(),
                ticket.getStatus(),
                ticket.getPriority(),
                ticket.getCreatedBy().getEmail(),
                ticket.getAssignedTo()!=null?ticket.getAssignedTo().getEmail():null,
                ticket.getCreatedAt(),
                ticket.getUpdatedAt()
        );
    }

//     User Create the Ticket
    public TicketResponse createTicket(String title , String description ,
                               TicketPriority priority ,
                               String currentUserEmail)
    {
        User user = userrepo.findByEmail(currentUserEmail)
                .orElseThrow(()-> new ResourceNotFoundException("User Not Found"));

        Ticket ticket = new Ticket();
        ticket.setTitle(title);
        ticket.setDescription(description);
        ticket.setPriority(priority);
        ticket.setStatus(TicketStatus.OPEN);
        ticket.setCreatedBy(user);

        Ticket savedticket = ticketrepo.save(ticket);

        return mapToResposne(savedticket);
    }

//    USER views their OWN Tickets

    public List<TicketResponse> getMyTickets(String currentUserEmail)
    {
        User user = userrepo.findByEmail(currentUserEmail)
                .orElseThrow(()->new ResourceNotFoundException("User Not Found"));

        return ticketrepo.findByCreatedBy(user)
                .stream()
                .map(this::mapToResposne)
                .toList();

    }

//    ADMIN views All the ticket

    public List<TicketResponse> getAllTickets(String currentUserRole)
    {
        if(!currentUserRole.equals("ADMIN"))
        {
            throw new AccessDeniedException("Access Denied");
        }

        return ticketrepo.findAll()
                .stream()
                .map(this::mapToResposne)
                .toList();

    }

//    Admin Assign A ticket

    public TicketResponse assignTicket(Long ticketId,
                               int userId,
                               String currentUserRole)
    {
        if(!currentUserRole.equals("ADMIN"))
        {
            throw new RuntimeException("ACCESS DENIED");
        }
        Ticket ticket = ticketrepo.findById(ticketId)
                .orElseThrow(()-> new ResourceNotFoundException("Ticket not found"));
        User assignee = userrepo.findById(userId)
                .orElseThrow(()-> new ResourceNotFoundException("User Not Found"));

        ticket.setAssignedTo(assignee);
        ticket.setStatus(TicketStatus.IN_PROGRESS);

        Ticket savedticket = ticketrepo.save(ticket);
        return mapToResposne(savedticket);

    }
//    USER marks ticket as RESOLVED
    public TicketResponse resolveTicket(Long ticketId , String currentUserEmail)
    {
        Ticket ticket = ticketrepo.findById(ticketId)
                .orElseThrow(()->new ResourceNotFoundException("Ticket Not Found"));

        if(!ticket.getCreatedBy().getEmail().equals(currentUserEmail))
        {
            throw  new InvalidOperationException("You can only resolve your own ticket");
        }

        if(ticket.getStatus()!=TicketStatus.IN_PROGRESS)
        {
            throw new RuntimeException("Ticket must be IN_PROGRESS to resolve");
        }
        ticket.setStatus(TicketStatus.RESOLVED);

        Ticket savedTicket = ticketrepo.save(ticket);
        return mapToResposne(savedTicket);
    }

//    ADMIN closes ticket

    public TicketResponse closeTicket(Long ticketId ,String currentUserRole)
    {
        if (!currentUserRole.equals("ADMIN")) {
            throw new RuntimeException("Only admin can close tickets");
        }

        Ticket ticket = ticketrepo.findById(ticketId)
                .orElseThrow(()-> new RuntimeException("Ticket Not Found"));

        if(ticket.getStatus()!=TicketStatus.RESOLVED)
        {
            throw new RuntimeException("Only resolved tickets can be closed");
        }
        ticket.setStatus(TicketStatus.CLOSED);

        Ticket savedTicket = ticketrepo.save(ticket);
        return mapToResposne(savedTicket);
    }



}
