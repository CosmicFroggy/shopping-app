package com.shopping.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shopping.backend.dto.RegisterRequestDto;
import com.shopping.backend.dto.RegisterResponseDto;
import com.shopping.backend.entity.Role;
import com.shopping.backend.entity.User;
import com.shopping.backend.service.UserService;


@RestController
@RequestMapping("/user")
public class UserController {
    
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<RegisterResponseDto> registerUser(@RequestBody RegisterRequestDto registerRequest) {
        registerRequest.setRole(Role.USER);
        User user = userService.registerUser(registerRequest);
        RegisterResponseDto response = new RegisterResponseDto(user.getId(), user.getUsername(), user.getRole().name());
        return ResponseEntity.ok(response);
    }
}
