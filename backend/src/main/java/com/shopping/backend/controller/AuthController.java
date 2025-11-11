package com.shopping.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173") // TODO: set up CORS properly
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    private class AuthRequest {
        private String username;
        private String password;
    }
    
    @PostMapping()
    public String authenticate(@RequestBody AuthRequest authRequest) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.username, authRequest.password));
            //TODO: create jwt
            return "jwt token";
        } catch (Exception err) {
            throw err;
        }
    }
    
}
