package com.edu.missouristate.painting.repositories;

import com.edu.missouristate.painting.models.Painting;
import com.edu.missouristate.painting.models.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface PaintingRepository extends CrudRepository<Painting, Integer> {
    List<Painting> findByPublisher(User publisher);
}
