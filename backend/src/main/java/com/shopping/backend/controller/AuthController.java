package com.shopping.backend.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shopping.backend.dto.AuthRequestDto;
import com.shopping.backend.service.AuthService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping()  // TODO: wrap this in a responseentity?
    public String authenticate(@RequestBody AuthRequestDto authRequest) {
        String token = authService.authenticate(authRequest);
        return token;
    }
}
