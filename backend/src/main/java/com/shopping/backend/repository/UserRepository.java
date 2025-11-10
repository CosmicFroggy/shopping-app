package com.shopping.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.shopping.backend.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
    
    // this method is actually auto-generated from the method name!
    Optional<User> findByUsername(String username);
}
