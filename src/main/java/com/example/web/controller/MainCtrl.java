package com.example.web.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.domain.Rate;
import com.example.service.CSVReaderImpl;

@RestController	
public class MainCtrl {
	
	@Autowired
	CSVReaderImpl csvReader;

	@RequestMapping(value = "/test", method = RequestMethod.GET)
	public ResponseEntity<List<Rate>> test(){
		List<Rate> rates = CSVReaderImpl.readFromFile("/Users/Dave/workspace/InvestmentFund/src/main/resources/data.csv");
		return new ResponseEntity<List<Rate>>(rates, HttpStatus.OK);
	}
	
}
