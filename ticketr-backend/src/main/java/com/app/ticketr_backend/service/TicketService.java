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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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

    private TicketResponse mapToResponse(Ticket ticket)
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

        return mapToResponse(savedticket);
    }

//    USER views their OWN Tickets

    public List<TicketResponse> getMyTickets(String currentUserEmail)
    {
        User user = userrepo.findByEmail(currentUserEmail)
                .orElseThrow(()->new ResourceNotFoundException("User Not Found"));

        return ticketrepo.findByCreatedBy(user)
                .stream()
                .map(this::mapToResponse)
                .toList();

    }

//    ADMIN views All the ticket

    public Page<TicketResponse> getAllTickets(int page , int size , TicketStatus status , TicketPriority priority)
    {
        Pageable pageable = PageRequest.of(page,size, Sort.by("createdAt").descending());
        Page<Ticket> ticketpage;
        if(status!=null&&priority!=null)
        {
            ticketpage = ticketrepo.findByStatusAndPriority(status,priority,pageable);
        }
        else if(status!=null)
        {
            ticketpage = ticketrepo.findByStatus(status,pageable);
        }
        else if(priority!=null)
        {
            ticketpage = ticketrepo.findByPriority(priority,pageable);
        }
        else
        {
            ticketpage = ticketrepo.findAll(pageable);
        }



        return ticketpage.map(this::mapToResponse);

    }

//    Admin Assign A ticket

    public TicketResponse assignTicket(Long ticketId,
                               int userId)
    {
//        if(!currentUserRole.equals("ADMIN"))
//        {
//            throw new RuntimeException("ACCESS DENIED");
//        }
        Ticket ticket = ticketrepo.findById(ticketId)
                .orElseThrow(()-> new ResourceNotFoundException("Ticket not found"));
        if (ticket.getStatus() != TicketStatus.OPEN) {
            throw new InvalidOperationException("Only OPEN tickets can be assigned");
        }
        User assignee = userrepo.findById(userId)
                .orElseThrow(()-> new ResourceNotFoundException("User Not Found"));

        ticket.setAssignedTo(assignee);
        ticket.setStatus(TicketStatus.IN_PROGRESS);

        Ticket savedticket = ticketrepo.save(ticket);
        return mapToResponse(savedticket);

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
        return mapToResponse(savedTicket);
    }

//    ADMIN closes ticket

    public TicketResponse closeTicket(Long ticketId)
    {
//        if (!currentUserRole.equals("ADMIN")) {
//            throw new RuntimeException("Only admin can close tickets");
//        }

        Ticket ticket = ticketrepo.findById(ticketId)
                .orElseThrow(()-> new RuntimeException("Ticket Not Found"));

        if(ticket.getStatus()!=TicketStatus.RESOLVED)
        {
            throw new RuntimeException("Only resolved tickets can be closed");
        }
        ticket.setStatus(TicketStatus.CLOSED);

        Ticket savedTicket = ticketrepo.save(ticket);
        return mapToResponse(savedTicket);
    }



}
