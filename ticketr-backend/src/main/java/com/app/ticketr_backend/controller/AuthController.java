package com.app.ticketr_backend.controller;

import com.app.ticketr_backend.dto.request.LoginRequest;
import com.app.ticketr_backend.dto.request.RegisterRequest;
import com.app.ticketr_backend.dto.response.LoginResponse;
import com.app.ticketr_backend.dto.response.UserMeResponse;
import com.app.ticketr_backend.model.User;
import com.app.ticketr_backend.service.AuthService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173",
        allowCredentials = "true"
)
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
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest loginRequest , HttpServletResponse response)
    {
        LoginResponse loginresponse = authService.login(loginRequest);

        Cookie cookie = new Cookie("access_token" , loginresponse.getToken());
        cookie.setHttpOnly(false);
        cookie.setSecure(false);
        cookie.setPath("/");
        cookie.setMaxAge(60*60*60);
        cookie.setAttribute("SameSite" , "Strict");
        response.addCookie(cookie);
        return ResponseEntity.ok(new LoginResponse(null,loginresponse.getRole()));
    }

    @GetMapping("/me")
    public ResponseEntity<UserMeResponse> me(Authentication authentication)
    {
        String email = authentication.getName();
        String role = authentication.getAuthorities()
                .iterator()
                .next()
                .getAuthority()
                .replace("ROLE_","");

        return ResponseEntity.ok(new UserMeResponse(email,role));

    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response)
    {
        Cookie cookie = new Cookie("access_token",null);
        cookie.setHttpOnly(true);
        cookie.setSecure(false);
        cookie.setPath("/");
        cookie.setMaxAge(0);

        response.addCookie(cookie);

        return ResponseEntity.ok("Logged out successfully");

    }





}
