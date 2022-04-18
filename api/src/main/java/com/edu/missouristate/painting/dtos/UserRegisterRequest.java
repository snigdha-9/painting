package com.edu.missouristate.painting.dtos;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

@Data
public class UserRegisterRequest {
    @NotEmpty
    @Size(min = 3, max = 10)
    private String firstName;
    @NotEmpty
    @Size(min = 3, max = 10)
    private String lastName;
    @NotEmpty
    @Size(min = 8, max = 15)
    private String password;
    @NotEmpty
    @Email
    @Size(min = 6, max = 20)
    private String email;
}
