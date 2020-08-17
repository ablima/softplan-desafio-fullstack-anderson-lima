package com.softplan.desafio.anderson.lima.model;

import java.util.ArrayList;
import java.util.List;

public class Process {
	private long id;
	private String description;
	private String report;
	private Boolean finished;
	private List<Long> users;
	
	public Process(long id, String description, String report, Boolean finished, List<Long> users) {
		super();
		this.id = id;
		this.description = description;
		this.report = report;
		this.finished = finished;
		this.users = users;
	}
		
	public long getId() {
		return id;
	}
	
	public void setId(long id) {
		this.id = id;
	}
	
	public String getDescription() {
		return description;
	}
	
	public void setDescription(String description) {
		this.description = description;
	}
	
	public String getReport() {
		return report;
	}
	
	public void setReport(String report) {
		this.report = report;
	}
	
	public Boolean getFinished() {
		return finished;
	}
	
	public void setFinished(Boolean finished) {
		this.finished = finished;
	}
	
	public List<Long> getUsers() {
		return users;
	}
	
	public void setUsers(List<Long> users) {
		this.users = users;
	}
	
}
