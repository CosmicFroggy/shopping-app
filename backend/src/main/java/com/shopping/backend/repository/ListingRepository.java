package com.shopping.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shopping.backend.Entity.Listing;

public interface ListingRepository extends JpaRepository<Listing, Long> {
}
