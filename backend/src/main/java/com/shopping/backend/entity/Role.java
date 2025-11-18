package com.shopping.backend.entity;

import java.util.Set;

public enum Role {
    ADMIN(Set.of(Permission.READ, Permission.WRITE, Permission.DELETE)),
    USER(Set.of(Permission.READ));

    private final Set<Permission> permissions;

    Role(Set<Permission> permissions) {
        this.permissions = permissions;
    }

    public Set<Permission> getPermissions() {
        return permissions;
    }
}


