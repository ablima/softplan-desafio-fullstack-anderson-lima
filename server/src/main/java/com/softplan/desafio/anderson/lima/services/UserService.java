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
	
	public String addUser(User user) {
		users.add(new User(idCounter++, user.getUsername(), user.getPassword(), user.getType()));
		return "OK";
	}
	
	public void removeUser(long id) {
		User user = null;
		
		for(User u : users) {
			if(u.getId() == id) {
				user = u;
				break;
			}
		}
		
		if(user != null) {
			users.remove(user);			
		}
	}
	
	public User login(String username, String password) {
		for(User u : users) {
			if(u.getUsername().equals(username) && u.getPassword().equals(password)) {			
				return u;
			}
		}
		
		return null;
	}
	
}
