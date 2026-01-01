package com.app.ticketr_backend.controller;


import com.app.ticketr_backend.dto.request.CreateTicketRequest;
import com.app.ticketr_backend.dto.response.TicketResponse;
import com.app.ticketr_backend.model.Ticket;
import com.app.ticketr_backend.service.TicketService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/tickets")
@CrossOrigin("http://localhost:5173")
public class TicketController
{
    private final TicketService ticketService;
    public TicketController(TicketService ticketService)
    {
        this.ticketService = ticketService;
    }
    @PostMapping("/create")
    public ResponseEntity<TicketResponse> createTicket(@RequestBody @Valid CreateTicketRequest request, Authentication authentication)
    {
        String email = authentication.getName();
        TicketResponse ticket = ticketService.createTicket(request.getTitle(),
                request.getDescription(),
                request.getPriority(),email);
        return ResponseEntity.ok(ticket);
    }

    @GetMapping("/mytickets")
    public ResponseEntity<List<TicketResponse>> getMyTickets( Authentication authentication)
    {
        String email = authentication.getName();
        return ResponseEntity.ok(ticketService.getMyTickets(email));

    }

    @GetMapping("/alltickets")
    public ResponseEntity<List<TicketResponse>> getAlltickets(Authentication authentication)
    {
        String role = authentication.getAuthorities()
                .iterator()
                .next()
                .getAuthority()
                .replace("ROLE_","");
        return ResponseEntity.ok(ticketService.getAllTickets(role));
    }

    @PutMapping("/{ticketId}/assign/{userId}")
    public ResponseEntity<TicketResponse> assignTicket(@PathVariable Long ticketId , @PathVariable int userId , Authentication authentication)
    {
        String role = authentication.getAuthorities()
                .iterator()
                .next()
                .getAuthority()
                .replace("ROLE_","");
        return ResponseEntity.ok(ticketService.assignTicket(ticketId,userId,role));
    }

    @PutMapping("/{ticketId}/resolve")
    public ResponseEntity<TicketResponse> resolveTicket(@PathVariable Long ticketId,Authentication authentication)
    {
        String email = authentication.getName();
        return ResponseEntity.ok(ticketService.resolveTicket(ticketId,email));
    }

    @PutMapping("/{ticketId}/close")
    public ResponseEntity<TicketResponse> closeTicket(@PathVariable Long ticketId , Authentication authentication)
    {
        String role = authentication.getAuthorities()
                .iterator()
                .next()
                .getAuthority()
                .replace("ROLE_","");
        return ResponseEntity.ok(ticketService.closeTicket(ticketId,role));

    }



}
