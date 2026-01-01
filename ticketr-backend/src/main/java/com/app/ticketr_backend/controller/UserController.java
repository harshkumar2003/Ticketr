package com.app.ticketr_backend.controller;

import com.app.ticketr_backend.model.User;
import com.app.ticketr_backend.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/test")
public class UserController
{
    private final UserService userService;
    public UserController(UserService userService)
    {
        this.userService = userService;
    }

    @GetMapping("/greet")
    public String hello()
    {
        return "JWT Working";
    }


}
