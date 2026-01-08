package com.app.ticketr_backend.dto.response;

public class LoginResponse
{
    private String token;

    public String getRole() {
        return role;
    }

    public String getToken() {
        return token;
    }

    private String role;
    public LoginResponse(){}
    public LoginResponse(String token, String role) {
        this.token = token;
        this.role = role;
    }




}
