package com.softplan.desafio.anderson.lima.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.softplan.desafio.anderson.lima.model.Process;
import com.softplan.desafio.anderson.lima.model.User;
import com.softplan.desafio.anderson.lima.model.UserType;
import com.softplan.desafio.anderson.lima.services.ProcessService;
import com.softplan.desafio.anderson.lima.services.UserService;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class ProcessController {

	@Autowired
	private ProcessService processService;
	
	@Autowired
	private UserService userService;
	
	@RequestMapping(value = "/process", method = RequestMethod.GET)
	public List<Process> getAllProcesses() {
		return processService.findAll();
	}
	
	@RequestMapping(value = "/process/{userId}", method = RequestMethod.GET)
	public List<Process> getUserProcesses(@PathVariable(value = "userId") long userId) {
		return processService.findByUserId(userId);
	}
	
	@RequestMapping(value = "/process/{userId}/add", method = RequestMethod.POST)
	public Boolean addProcess(@PathVariable(value = "userId") long userId, @RequestBody Process process) {
		User user = userService.getById(userId);
		
		if(user != null && user.getType() == UserType.Triator) {
			processService.addProcess(process);
			return true;
		}		
		
		return false;
	}
	
	@RequestMapping(value = "/process/{userId}/close/{processId}", method = RequestMethod.POST)
	public Boolean closeProcess(@PathVariable(value = "userId") long userId, 
			@PathVariable(value = "processId") long processId,
			@RequestBody Process process) {
		
		User user = userService.getById(userId);
		if(user != null && user.getType() == UserType.Finisher) {
			return processService.finishProcess(processId, process.getReport());			
		}
		
		return false;
	}
	
	@RequestMapping(value = "/process/{userId}/update/{processId}", method = RequestMethod.PUT)
	public Boolean updateProcess(@PathVariable(value = "userId") long userId, 
			@PathVariable(value = "processId") long processId,
			@RequestBody Process updatedProcess) {

		User user = userService.getById(userId);
		if(user != null && user.getType() == UserType.Triator) {
			return processService.updateProcess(processId, updatedProcess);
		}
		
		return false;
	}
	
}
