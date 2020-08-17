package com.softplan.desafio.anderson.lima.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.softplan.desafio.anderson.lima.model.User;
import com.softplan.desafio.anderson.lima.model.UserType;
import com.softplan.desafio.anderson.lima.services.UserService;

@RestController
public class UserController {

	@Autowired
	private UserService userService;
	
	@RequestMapping(value = "/users", method = RequestMethod.GET)
	public List<User> getAllUsers() {
		return userService.findAll();
	}
	
	@RequestMapping(value = "/userTypes", method = RequestMethod.GET)
	public List<UserType> getAllUserTypes(){
		return userService.findAllTypes();
	}
	
	@RequestMapping(value = "/users/add", method = RequestMethod.POST)
	public void addUser(@RequestBody User user) {
		userService.addUser(user);
	}
	
	@RequestMapping(value = "/users/{id}", method = RequestMethod.DELETE) 
	public Boolean deleteUser(@PathVariable(value = "id") long id){
		return userService.removeUser(id);
	}

	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public User login(@RequestParam String username, @RequestParam String password) {
		return userService.login(username, password);
	}
	
}
