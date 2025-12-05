
package com.shopping.backend.controller;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.PagedModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shopping.backend.entity.Listing;
import com.shopping.backend.service.ListingService;


@RestController
@RequestMapping("/listing")
public class ListingController {
    
    private final ListingService listingService;

    public ListingController(ListingService listingService) {
        this.listingService = listingService;
    }

    // use HATEOAS PagedModel to return next, previous, etc. links
    @GetMapping                                                                       // assembler is method injected here
    public ResponseEntity<PagedModel<EntityModel<Listing>>> getAll(Pageable pageable, PagedResourcesAssembler<Listing> assembler) {
        Page<Listing> listings = listingService.getAll(pageable);
        return ResponseEntity.ok(assembler.toModel(listings));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Listing> getById(@PathVariable Long id) {
        return ResponseEntity.ok(listingService.getById(id));
    }

    @PostMapping
    public ResponseEntity<Listing> create(@RequestBody Listing listing) {
        return ResponseEntity.ok(listingService.create(listing));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        listingService.delete(id);
        return ResponseEntity.noContent().build();
    }
    
    
}
