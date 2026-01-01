package com.app.ticketr_backend.repository;

import com.app.ticketr_backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface Userrepo extends JpaRepository<User,Integer> {


     Optional<User> findByEmail(String email);

     boolean existsByEmail(String email);
}
