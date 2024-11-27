package org.example.Repositories;

import org.example.Model.Collabs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CollabsRepository extends JpaRepository<Collabs, Long> {
    
    
}
