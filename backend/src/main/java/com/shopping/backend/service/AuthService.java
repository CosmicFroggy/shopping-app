package com.shopping.backend.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;

import com.shopping.backend.dto.AuthRequestDto;
import com.shopping.backend.dto.AuthResponseDto;
import com.shopping.backend.entity.User;
import com.shopping.backend.util.JWTUtil;

@Service
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final JWTUtil jwtUtil;
    
    public AuthService(AuthenticationManager authenticationManager, UserService userService, JWTUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    public AuthResponseDto authenticate(AuthRequestDto authRequest) {
        try {
            // this will throw an exception if authentication fails
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
            User user = this.userService.getByUsername(authRequest.getUsername());
            String token = jwtUtil.generateToken(authRequest.getUsername());
            AuthResponseDto response = new AuthResponseDto(user.getUsername(), user.getRole().name(), token);
            return response;
        } catch (AuthenticationException err) {
            throw err;
        }
    }
}
