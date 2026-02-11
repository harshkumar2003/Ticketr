package com.app.ticketr_backend.controller;

import com.app.ticketr_backend.dto.response.UserResponse;
import com.app.ticketr_backend.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/users")
public class UserController
{
    private final UserService userService;


    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<List<UserResponse>> getAllUsers()
    {
        return ResponseEntity.ok(userService.getAllUser());
    }


}
