package com.shopping.backend.filter;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.shopping.backend.service.UserService;
import com.shopping.backend.util.JWTUtil;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JWTAuthenticationFilter extends OncePerRequestFilter{


    @Autowired
    JWTUtil jwtUtil;

    @Autowired
    UserService userService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            // extract username from JWT, also verify the JWT in the process
            String token = authHeader.substring(7);
            String username = jwtUtil.extractUsername(token); // exception will be thrown if the token signature is invalid
                                                       // TODO: handle these exceptions somewhere

            // check that this user exists in the database and update security context if so
            try {
                UserDetails userDetails = userService.loadUserByUsername(username); // will throw error if no user found in db
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(authToken);
            } catch (UsernameNotFoundException error) {
                System.out.println("ERROR: " + error.getMessage()); // user does not exist in database
            }
        }

        // call the next filter in the chain
        filterChain.doFilter(request, response);
    }
    
}
