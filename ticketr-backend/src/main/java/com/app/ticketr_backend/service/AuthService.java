package com.app.ticketr_backend.service;

import com.app.ticketr_backend.dto.request.LoginRequest;
import com.app.ticketr_backend.dto.request.RegisterRequest;
import com.app.ticketr_backend.dto.response.LoginResponse;
import com.app.ticketr_backend.model.User;
import com.app.ticketr_backend.repository.Userrepo;
import com.app.ticketr_backend.security.JwtUtil;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthService
{
    private final Userrepo userrepo;
    private final PasswordEncoder encoder;
    private final JwtUtil jwtUtil;

    public AuthService(Userrepo userrepo , PasswordEncoder encoder , JwtUtil jwtUtil)
    {
        this.userrepo = userrepo;
        this.encoder = encoder;
        this.jwtUtil = jwtUtil;
    }

    public void register(RegisterRequest registerRequest)
    {
        if(userrepo.existsByEmail(registerRequest.getEmail()))
        {
            throw new RuntimeException("Email Already exists");
        }

        User user = new User();
        user.setName(registerRequest.getName());
        user.setEmail((registerRequest.getEmail()));
        user.setPassword(encoder.encode(registerRequest.getPassword()));
        user.setRole("USER");
        user.setActive(true);
        userrepo.save(user);

    }

    public LoginResponse login(LoginRequest loginRequest)
    {
        User user = userrepo.findByEmail(loginRequest.getEmail()).
                orElseThrow(()-> new RuntimeException("Invalid Email or Password"));

        if(!user.isActive())
        {
            throw new RuntimeException("User is not Active");
        }

        if(!encoder.matches(loginRequest.getPassword(),user.getPassword()))
        {
            throw new RuntimeException("Password not matched");
        }

        String token = jwtUtil.generateToken(user.getEmail(),user.getRole());

        return new LoginResponse(token,user.getRole());
    }


}
