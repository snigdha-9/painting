package com.edu.missouristate.painting.services;

import com.edu.missouristate.painting.models.User;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;
import java.util.Optional;

public interface UserService {
    public User create(User user);

    public List<User> getAll();

    public Optional<User> getByEmail(String email);

    public Optional<UserDetails> getUserDetails(String email);
}
