package com.app.ticketr_backend.exception;

public class InvalidOperationException extends RuntimeException
{
    public InvalidOperationException(String message)
    {
        super(message);
    }
}
