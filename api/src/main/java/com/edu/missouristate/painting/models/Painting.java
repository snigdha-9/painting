package com.edu.missouristate.painting.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Painting {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    @With
    private String name;
    @With
    private String description;
    @With
    @Column(unique = true, nullable = false)
    private String url;
    @With
    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "publisher_id")
    private User publisher;
}
