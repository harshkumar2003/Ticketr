package com.app.ticketr_backend.service;

import com.app.ticketr_backend.dto.response.UserResponse;
import com.app.ticketr_backend.repository.Userrepo;
import org.springframework.stereotype.Service;
import com.app.ticketr_backend.model.User;

import java.util.List;

@Service
public class UserService
{
    private final Userrepo userrepo;

    public UserService(Userrepo userrepo)
    {

        this.userrepo = userrepo;
    }

    public List<UserResponse> getAllUser()
    {
        return userrepo.findAll()
                .stream()
                .map(user -> new UserResponse(
                        user.getId(),
                        user.getEmail(),
                        user.getName()
                ))
                .toList();
    }
}
