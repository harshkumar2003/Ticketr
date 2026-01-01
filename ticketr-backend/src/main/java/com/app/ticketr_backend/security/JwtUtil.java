package com.app.ticketr_backend.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil
{
    @Value("${jwt.secret}")
    private String secretKey;
    @Value("${jwt.expiration}")
    private long expiration;

    private Key getSigningKey()
    {
        return Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets .UTF_8));
    }


//    Generate JWT Token

    public String generateToken(String email , String role)
    {
        return Jwts.builder()
                .subject(email)
                .claim("role",role)
                .expiration(new Date())
                .expiration(new Date(System.currentTimeMillis()+expiration))
                .signWith(getSigningKey())
                .compact();

    }

//    Extract all claims

    public Claims extractClaims(String token)
    {
        return Jwts.parser()
                .verifyWith((SecretKey) getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

//    Extract email(subject)
    public String extractEmail(String token)
    {
        return extractClaims(token).getSubject();
    }

//    Extract role

    public String extractRole(String token)
    {
        return extractClaims(token)
                .get("role",String.class);
    }

//    Valid Token

    public boolean isTokenValid(String token)
    {
        try
        {
            extractClaims(token);
            return true;
        }
        catch (JwtException|IllegalArgumentException e)
        {
            return false;
        }
    }



}
