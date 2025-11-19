package com.shopping.backend.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.shopping.backend.dto.RegisterRequestDto;
import com.shopping.backend.entity.User;
import com.shopping.backend.repository.UserRepository;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository; 
    private final PasswordEncoder passwordEncoder;
    
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username)
            .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
    }

    public User registerUser(RegisterRequestDto registerRequest) {
        // check user doesn't already exist
        if (userRepository.findByUsername(registerRequest.getUsername()).isPresent()) {
            throw new UserAlreadyExistsException("Username is taken.");  // TODO: might need to write better custom exception than this
        }

        // create user object and encode the password
        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setRole(registerRequest.getRole());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));

        // save and return new user 
        return userRepository.save(user);
    }
}
