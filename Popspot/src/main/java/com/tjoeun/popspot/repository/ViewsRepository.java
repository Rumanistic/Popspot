package com.tjoeun.popspot.repository;

import com.tjoeun.popspot.domain.Views;
import com.tjoeun.popspot.domain.Views.ViewsId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ViewsRepository extends JpaRepository<Views, ViewsId> {
}
