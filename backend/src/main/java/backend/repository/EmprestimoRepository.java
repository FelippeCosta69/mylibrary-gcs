package com.mylibrary.backend.repository;

import com.mylibrary.backend.model.Emprestimo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface EmprestimoRepository extends JpaRepository<Emprestimo, Long> {
    List<Emprestimo> findByDataDevolucaoEfetivaIsNull();
    List<Emprestimo> findByLivro_Id(Long livroId);
}