package com.example.web.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.domain.Rate;
import com.example.mappers.RateMapper;

@RestController	
public class MainCtrl {
	
	@Autowired
	private RateMapper rateMapper;

	@RequestMapping(value = "/test", method = RequestMethod.GET)
	public ResponseEntity<List<Rate>> test(){
		List<Rate> rates = rateMapper.getAllRates();
		return new ResponseEntity<List<Rate>>(rates, HttpStatus.OK);
	}
	
}
