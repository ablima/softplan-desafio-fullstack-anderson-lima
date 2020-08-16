package com.softplan.desafio.anderson.lima.model;

public class User {
	private long id;
	private String username;
	private String password;
	private UserType type;
	
	public User(long id, String username, String password, UserType type) {
		super();
		this.id = id;
		this.username = username;
		this.password = password;
		this.type = type;
	}
	
	public long getId() {
		return id;
	}
	
	public void setId(long id) {
		this.id = id;
	}
	
	public String getUsername() {
		return username;
	}
	
	public void setUsername(String username) {
		this.username = username;
	}
	
	public String getPassword() {
		return password;
	}
	
	public void setPassword(String password) {
		this.password = password;
	}
	
	public UserType getType() {
		return type;
	}
	
	public void setType(UserType type) {
		this.type = type;
	}
	
}
