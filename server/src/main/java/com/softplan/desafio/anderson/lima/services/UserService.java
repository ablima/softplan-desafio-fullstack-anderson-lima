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
	
	public List<UserType> findAllTypes() {
		List<UserType> result = new ArrayList<UserType>();
		result.add(UserType.Admin);
		result.add(UserType.Triator);
		result.add(UserType.Finisher);
		return result;
	}
	
	public User getById(long id) {
		for(User u : users) {
			if(u.getId() == id) {
				return u;
			}
		}		
		return null;
	}
	
	public User addUser(User user) {
		User newUser = new User(idCounter++, user.getUsername(), user.getPassword(), user.getType());
		users.add(newUser);
		return newUser;
	}
	
	public Boolean removeUser(long id) {
		User user = null;
		
		for(User u : users) {
			if(u.getId() == id) {
				user = u;
				break;
			}
		}
		
		if(user != null) {
			users.remove(user);
			return true;
		}
		
		return false;
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
