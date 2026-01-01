package com.app.ticketr_backend.exception;

public class AccessDeniedException extends RuntimeException
{
    public AccessDeniedException(String message)
    {
        super(message);
    }
}
