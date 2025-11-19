package com.shopping.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shopping.backend.dto.ErrorResponseDto;
import com.shopping.backend.dto.RegisterRequestDto;
import com.shopping.backend.dto.RegisterResponseDto;
import com.shopping.backend.entity.Role;
import com.shopping.backend.entity.User;
import com.shopping.backend.service.UserAlreadyExistsException;
import com.shopping.backend.service.UserService;


@RestController
@RequestMapping("/user")
public class UserController {
    
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<RegisterResponseDto> registerUser(@RequestBody RegisterRequestDto registerRequest) {
        registerRequest.setRole(Role.USER);
        User user = userService.registerUser(registerRequest);
        RegisterResponseDto response = new RegisterResponseDto(user.getId(), user.getUsername(), user.getRole().name());
        return ResponseEntity.ok(response);
    }
    
    // TODO: create global exception handler, with more granular errors?
    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<ErrorResponseDto> handleUserAlreadyExists(UserAlreadyExistsException error) {
        return ResponseEntity
            .status(HttpStatus.CONFLICT)
            .body(new ErrorResponseDto("Username already taken."));
    }
}
