package com.app.ticketr_backend.controller;

import com.app.ticketr_backend.dto.request.LoginRequest;
import com.app.ticketr_backend.dto.request.RegisterRequest;
import com.app.ticketr_backend.dto.response.LoginResponse;
import com.app.ticketr_backend.model.User;
import com.app.ticketr_backend.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("http://localhost:5173")
public class AuthController
{
    private final AuthService authService;

    public AuthController(AuthService authService)
    {
        this.authService = authService;
    }
    @PostMapping("/register")
    public ResponseEntity<String> register(@Valid @RequestBody RegisterRequest request)
    {
        authService.register(request);
        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest loginRequest)
    {
        LoginResponse response = authService.login(loginRequest);
        return ResponseEntity.ok(response);
    }




}
