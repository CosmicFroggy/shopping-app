package com.shopping.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shopping.backend.dto.RegisterRequestDto;
import com.shopping.backend.entity.Role;
import com.shopping.backend.service.UserService;


@RestController
@RequestMapping("/user")
public class UserController {
    
    @Autowired
    private UserService userService;

    @PostMapping("/register")  // TODO: wrap the the jwt in a responseentity
    public String registerUser(@RequestBody RegisterRequestDto registerRequest) {
        registerRequest.setRole(Role.USER);
        String jwt = userService.registerUser(registerRequest);
        return jwt;
    }
}
