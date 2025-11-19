package com.shopping.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shopping.backend.dto.AuthRequestDto;
import com.shopping.backend.dto.AuthResponseDto;
import com.shopping.backend.service.AuthService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping()
    public ResponseEntity<AuthResponseDto> authenticate(@RequestBody AuthRequestDto authRequest) {
        String token = authService.authenticate(authRequest);
        AuthResponseDto response = new AuthResponseDto(token);
        return ResponseEntity.ok(response);
    }
}
