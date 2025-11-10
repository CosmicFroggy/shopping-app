package com.shopping.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.shopping.backend.entity.Listing;

@Repository
public interface ListingRepository extends JpaRepository<Listing, Long> {
}
