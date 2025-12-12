package com.shopping.backend.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.shopping.backend.entity.Role;
import com.shopping.backend.entity.User;
import com.shopping.backend.filter.JWTAuthenticationFilter;
import com.shopping.backend.repository.UserRepository;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationProvider authenticationProvider(UserDetailsService userDetailsService, PasswordEncoder passwordEncoder) {
        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider(userDetailsService);
        daoAuthenticationProvider.setPasswordEncoder(passwordEncoder);
        return daoAuthenticationProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationProvider authenticationProvider) {
        return new ProviderManager(authenticationProvider);
    }

    // TODO: currently, requests to /listing without tokens return 403, should this not be 401?

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, JWTAuthenticationFilter jwtAuthenticationFilter) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // not needed in rest api
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/auth/**", "/h2/**", "/user/register/**", "/actuator/health/**").permitAll()
                .anyRequest().authenticated())
            .headers(headers -> headers.frameOptions(frame -> frame.sameOrigin())) // h2 console breaks because spring security blocks iframes
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);  // add our custom jwt filter that will authenticate requests with a jwt token
        return http.build();
    }  

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.addAllowedOrigin("http://localhost:5173");
        config.addAllowedOrigin("http://localhost:5175");  // this is the port used by jenkins, only needed during test?
        config.addAllowedMethod("*");
        config.addAllowedHeader("*");
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;

    }
    
    // temporary startup initialisation to create an admin and normal user
    @Bean
    public CommandLineRunner createAdminUser(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            if (userRepository.findByUsername("admin").isEmpty()) {
                User admin = new User();
                admin.setUsername("admin");
                admin.setPassword(passwordEncoder.encode("admin1234"));
                admin.setRole(Role.ADMIN);
                userRepository.save(admin);
                System.out.println("Default admin user created!");

                User user = new User();
                user.setUsername("user");
                user.setPassword(passwordEncoder.encode("user1234"));
                user.setRole(Role.USER);
                userRepository.save(user);
                System.out.println("Default basic user created!");
            }
        };
    }
    
}
