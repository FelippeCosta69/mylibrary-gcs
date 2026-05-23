package com.mylibrary.backend.repository;

import com.mylibrary.backend.model.Livro;
import com.mylibrary.backend.model.StatusLivro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface LivroRepository extends JpaRepository<Livro, Long> {
    List<Livro> findByCategoria_Id(Long categoriaId);
    List<Livro> findByStatus(StatusLivro status);
    List<Livro> findByTituloContainingIgnoreCaseOrAutorContainingIgnoreCase(String titulo, String autor);
}