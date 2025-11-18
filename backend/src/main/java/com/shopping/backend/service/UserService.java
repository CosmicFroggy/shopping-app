package com.shopping.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.shopping.backend.dto.RegisterRequestDto;
import com.shopping.backend.entity.User;
import com.shopping.backend.repository.UserRepository;
import com.shopping.backend.util.JWTUtil;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository; 

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JWTUtil jwtUtil;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username)
            .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
    }

    public String registerUser(RegisterRequestDto registerRequest) {
        // check user doesn't already exist
        if (userRepository.findByUsername(registerRequest.getUsername()).isPresent()) {
            throw new RuntimeException("User already exists!!"); // TODO: create a custom exception here
        }

        // create user object and encode the password
        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setRole(registerRequest.getRole());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));

        // save new user 
        userRepository.save(user);

        // TODO: should this functionality be handled separately?
        // generate jwt for new user to use and return
        return jwtUtil.generateToken(registerRequest.getUsername());
    }
    
}
