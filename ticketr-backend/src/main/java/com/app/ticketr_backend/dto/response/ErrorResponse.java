package com.app.ticketr_backend.dto.response;

import java.time.LocalDateTime;

public class ErrorResponse
{
    private int status;

    public ErrorResponse(int status, String message) {
        this.status = status;
        this.message = message;
        this.timeStamp = timeStamp;
    }

    private String message;
    private LocalDateTime timeStamp;

    public int getStatus() {
        return status;
    }

    public String getMessage() {
        return message;
    }

    public LocalDateTime getTimeStamp() {
        return timeStamp;
    }
}
