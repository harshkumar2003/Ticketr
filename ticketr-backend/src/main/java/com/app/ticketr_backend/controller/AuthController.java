package com.app.ticketr_backend.controller;

import com.app.ticketr_backend.dto.request.LoginRequest;
import com.app.ticketr_backend.dto.request.RegisterRequest;
import com.app.ticketr_backend.dto.response.LoginResponse;
import com.app.ticketr_backend.dto.response.UserMeResponse;
import com.app.ticketr_backend.service.AuthService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
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
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(60*60*60);
        cookie.setAttribute("SameSite" , "None");
        response.addCookie(cookie);
        return ResponseEntity.ok(new LoginResponse(null,loginresponse.getRole()));
    }

    @GetMapping("/me")
    public ResponseEntity<UserMeResponse> me(Authentication authentication)
    {
        if(authentication == null || !authentication.isAuthenticated())
        {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

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
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        cookie.setAttribute("SameSite","None");

        response.addCookie(cookie);

        return ResponseEntity.ok("Logged out successfully");

    }





}
