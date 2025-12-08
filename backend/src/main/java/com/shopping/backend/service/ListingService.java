package com.shopping.backend.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.shopping.backend.entity.Listing;
import com.shopping.backend.repository.ListingRepository;

@Service
public class ListingService {
    
    private final ListingRepository listingRepository;

    public ListingService(ListingRepository listingRepository) {
        this.listingRepository = listingRepository;
    }

    public Page<Listing> getAll(Pageable pageable) {
        return listingRepository.findAll(pageable);
    }

    public Listing getById(Long id) {
        Listing listing = listingRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Listing not found with id: " + id));
        return listing;
    }

    public Listing create(Listing listing) {
        return listingRepository.save(listing);
    }

     public void delete(Long id) {
        listingRepository.deleteById(id);
    }
}
