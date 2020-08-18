package com.softplan.desafio.anderson.lima.services;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.stereotype.Service;

import com.softplan.desafio.anderson.lima.model.Process;

@Service
public class ProcessService {

	private static List<Process> processes = new ArrayList<Process>();
	private static long idCounter = 0;
	
	static {
		processes.add(new Process(idCounter++, "This is the first process. Report to close it.", "", false, Arrays.asList(1L)));
		processes.add(new Process(idCounter++, "The second process.", "", false, Arrays.asList(1L)));
	}
	
	public List<Process> findAll() {
		return processes;
	}

	public List<Process> findByUserId(long userId) {
		List<Process> result = new ArrayList<Process>();
		for(Process p : processes) {
			if(p.getUsers() != null && p.getUsers().contains(userId)) {
				result.add(p);
			}
		}
		
		return result;
	}
	
	public Process getById(long id) {
		for(Process p : processes) {
			if(p.getId() == id) {
				return p;
			}
		}		
		
		return null;
	}
	
	public Process addProcess(Process process) {
		Process newProcess = new Process(idCounter++, process.getDescription(), "", false, process.getUsers());
		processes.add(newProcess);
		return newProcess;
	}
	
	public Boolean finishProcess(long processId, String report) {
		for(Process p : processes) {
			if(p.getId() == processId) {
				p.setFinished(true);
				p.setReport(report);
				return true;
			}
		}
		
		return false;
	}
	
	public Boolean updateProcess(long processId, Process process) {
		for(Process p : processes) {
			if(p.getId() == processId) {
				p.setDescription(process.getDescription());
				p.setUsers(process.getUsers());
				return true;
			}
		}
		
		return false;
	}
	
}
