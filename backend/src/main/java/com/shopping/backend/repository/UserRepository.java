package com.shopping.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shopping.backend.entity.User;

public interface UserRepository extends JpaRepository<User, Long>{
}
