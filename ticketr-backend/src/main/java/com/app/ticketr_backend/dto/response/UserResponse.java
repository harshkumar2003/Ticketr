package com.app.ticketr_backend.dto.response;

public class UserResponse
{
    private int id;

    public UserResponse(int id, String email, String name) {
        this.id = id;
        this.email = email;
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getName() {
        return name;
    }

    private String email;
    private String name;

}
