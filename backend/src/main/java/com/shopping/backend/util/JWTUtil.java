package com.shopping.backend.util;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JWTUtil {

    private final long EXPIRATION_TIME = 1000 * 60 * 60;  // 1 hour in ms
    private final String SECRET = "8cf93d43ac4fbd6081aa4a7254cc0a64ff050fd82f08055644dd14ae0225263e";
    private final SecretKey key = Keys.hmacShaKeyFor(SECRET.getBytes()); 
    
    public String generateToken(String username) {
        return Jwts.builder()
            .subject(username)
            .issuedAt(new Date())
            .expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
            .signWith(key)
            .compact();
    }
}
