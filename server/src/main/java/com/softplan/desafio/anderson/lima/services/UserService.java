package com.softplan.desafio.anderson.lima.services;

import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;

import com.softplan.desafio.anderson.lima.model.User;
import com.softplan.desafio.anderson.lima.model.UserType;

@Service
public class UserService {

	private static List<User> users = new ArrayList<User>();
	private static long idCounter = 0;
	
	static {
		users.add(new User(idCounter++, "admin", "123456", UserType.Admin));
		users.add(new User(idCounter++, "triator", "123456", UserType.Triator));
		users.add(new User(idCounter++, "finisher", "123456", UserType.Finisher));
	}
	
	public List<User> findAll() {
		return users;
	}
	
}
