package com.edu.missouristate.painting.services;

import com.edu.missouristate.painting.models.User;

public interface AuthService {
    public String signIn(User user);

    public User signUp(User user);
}
