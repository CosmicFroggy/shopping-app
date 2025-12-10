package com.shopping.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shopping.backend.dto.AuthRequestDto;
import com.shopping.backend.dto.AuthResponseDto;
import com.shopping.backend.dto.ErrorResponseDto;
import com.shopping.backend.service.AuthService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping
    public ResponseEntity<AuthResponseDto> authenticate(@RequestBody AuthRequestDto authRequest) {
        AuthResponseDto response = authService.authenticate(authRequest);  // will throw exception if authentication fails
        return ResponseEntity.ok(response);
    }

    // TODO: create global exception handler, with more granular errors?
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ErrorResponseDto> handleBadCredentials(BadCredentialsException error) {
        return ResponseEntity
            .status(HttpStatus.UNAUTHORIZED)
            .body(new ErrorResponseDto("Invalid credentials."));
    }
}