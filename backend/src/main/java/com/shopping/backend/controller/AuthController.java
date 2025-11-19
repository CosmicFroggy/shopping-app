package com.shopping.backend.controller;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shopping.backend.dto.AuthRequestDto;
import com.shopping.backend.util.JWTUtil;


@RestController
@RequestMapping("/auth")
public class AuthController {


    private final AuthenticationManager authenticationManager;
    private final JWTUtil jwtUtil;

    public AuthController(AuthenticationManager authenticationManager, JWTUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping()  // TODO: wrap this in a responseentity?
    public String authenticate(@RequestBody AuthRequestDto authRequest) {
        // TODO: should this logic not be in it's own service?
        try {
            // this will throw an exception if authentication fails
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
            return jwtUtil.generateToken(authRequest.getUsername());
        } catch (AuthenticationException err) {
            throw err;
        }
    }
    
}
