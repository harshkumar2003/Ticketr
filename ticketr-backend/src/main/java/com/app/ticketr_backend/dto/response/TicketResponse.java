package com.app.ticketr_backend.dto.response;

import com.app.ticketr_backend.model.TicketPriority;
import com.app.ticketr_backend.model.TicketStatus;

import java.time.LocalDateTime;

public class TicketResponse
{
    private Long id;

    public String getTitle() {
        return title;
    }

    public Long getId() {
        return id;
    }

    public String getDescription() {
        return description;
    }

    public TicketStatus getStatus() {
        return status;
    }

    public TicketPriority getPriority() {
        return priority;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public String getAssignedTo() {
        return assignedTo;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    private String title;

    public TicketResponse() {}
    public TicketResponse(Long id, String title, String description, TicketStatus status, TicketPriority priority, String createdBy, String assignedTo, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
        this.priority = priority;
        this.createdBy = createdBy;
        this.assignedTo = assignedTo;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }


    private String description;
    private TicketStatus status;
    private TicketPriority priority;

    private String createdBy;     // email
    private String assignedTo;    // email (nullable)

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;


}
