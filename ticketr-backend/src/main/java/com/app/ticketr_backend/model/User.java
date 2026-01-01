package com.app.ticketr_backend.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;


@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "users")
public class User
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    @Column(unique = true , nullable = false)
    private String email;
    private String password;
    private String role;
    private boolean isActive;
    @CreationTimestamp
    @Column(name = "created_at" , updatable = false, nullable = false )
    private LocalDateTime createdAt;
}
