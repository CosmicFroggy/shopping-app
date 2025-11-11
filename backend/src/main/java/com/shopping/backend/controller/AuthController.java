package com.shopping.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shopping.backend.dto.AuthRequestDTO;
import com.shopping.backend.util.JWTUtil;


@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173") // TODO: set up CORS properly
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JWTUtil jwtUtil;
    
    @PostMapping()  // TODO: wrap this in a responseentity?
    public String authenticate(@RequestBody AuthRequestDTO authRequest) {
        try {
            // this will throw an exception if authentication fails
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
            return jwtUtil.generateToken(authRequest.getUsername());
        } catch (AuthenticationException err) {
            throw err;
        }
    }
    
}
