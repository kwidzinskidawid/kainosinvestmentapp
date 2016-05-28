package com.example.web.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.domain.Rate;
import com.example.domain.RateRange;
import com.example.service.RateRepository.RateRepository;

@RestController	
@RequestMapping("/api")
public class RestCtrl {
	
	@Autowired
	private RateRepository rateRepository;

	@RequestMapping(value = "/rates", method = RequestMethod.GET)
	public ResponseEntity<List<Rate>> getRates(){
		List<Rate> rates = rateRepository.getAllRates();
		return new ResponseEntity<List<Rate>>(rates, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/rates/range", method = RequestMethod.POST)
	public ResponseEntity<List<Rate>> getRatesDate(@RequestBody RateRange rateRange){
		List<Rate> rates = rateRepository.getAllRatesInDateRange(rateRange);
		return new ResponseEntity<List<Rate>>(rates, HttpStatus.OK);
	}

	@RequestMapping("/import")
	public void importRates() {
		rateRepository.deleteAllRates();
        rateRepository.importFromFile("/Users/Dave/workspace/InvestmentFund/src/main/resources/data.csv");
        System.out.println("Import completed.");
	}
	
}
