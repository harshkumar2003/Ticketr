package com.app.ticketr_backend.controller;


import com.app.ticketr_backend.dto.request.CreateTicketRequest;
import com.app.ticketr_backend.dto.response.TicketResponse;
import com.app.ticketr_backend.model.TicketPriority;
import com.app.ticketr_backend.model.TicketStatus;
import com.app.ticketr_backend.service.TicketService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/tickets")
@CrossOrigin(origins = "http://localhost:5173",
        allowCredentials = "true"
)
public class TicketController
{
    private final TicketService ticketService;
    public TicketController(TicketService ticketService)
    {
        this.ticketService = ticketService;
    }
    @PreAuthorize("hasRole('USER')")
    @PostMapping("/create")
    public ResponseEntity<TicketResponse> createTicket(@RequestBody @Valid CreateTicketRequest request, Authentication authentication)
    {
        String email = authentication.getName();
        TicketResponse ticket = ticketService.createTicket(request.getTitle(),
                request.getDescription(),
                request.getPriority(),email);
        return ResponseEntity.ok(ticket);
    }


    @PreAuthorize("hasRole('USER')")
    @GetMapping("/my")
    public ResponseEntity<List<TicketResponse>> getMyTickets( Authentication authentication)
    {
        String email = authentication.getName();
        return ResponseEntity.ok(ticketService.getMyTickets(email));

    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/assigned")
    public ResponseEntity<List<TicketResponse>> getAssignedTickets(Authentication authentication)
    {
        String email = authentication.getName();
        return ResponseEntity.ok(ticketService.getAssignedTickets(email));
    }
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping()
    public ResponseEntity<Page<TicketResponse>> getAllTickets(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) TicketStatus status,
            @RequestParam(required = false)TicketPriority priority)
    {
        return ResponseEntity.ok(ticketService.getAllTickets(page,size,status,priority));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{ticketId}/assign/{userId}")
    public ResponseEntity<TicketResponse> assignTicket(@PathVariable Long ticketId , @PathVariable int userId)
    {
        return ResponseEntity.ok(ticketService.assignTicket(ticketId,userId));
    }

    @PreAuthorize("hasRole('USER')")
    @PutMapping("/{ticketId}/resolve")
    public ResponseEntity<TicketResponse> resolveTicket(@PathVariable Long ticketId,Authentication authentication)
    {
        String email = authentication.getName();
        return ResponseEntity.ok(ticketService.resolveTicket(ticketId,email));
    }


    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{ticketId}/close")
    public ResponseEntity<TicketResponse> closeTicket(@PathVariable Long ticketId)
    {
        return ResponseEntity.ok(ticketService.closeTicket(ticketId));

    }



}
