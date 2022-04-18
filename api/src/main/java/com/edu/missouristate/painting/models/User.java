package com.edu.missouristate.painting.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    @With
    private String firstName;
    @With
    private String lastName;
    @With
    private String password;
    @With
    @Column(unique = true, nullable = false)
    private String email;
    @JsonManagedReference
    @OneToMany(mappedBy = "publisher")
    private List<Painting> paintings;
}
