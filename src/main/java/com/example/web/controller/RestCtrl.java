package com.example.web.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.domain.Rate;
import com.example.domain.RateRange;
import com.example.service.RateRepository.RateRepository;


@RestController	
@RequestMapping("/api")
public class RestCtrl {
	
	@Autowired
	private RateRepository rateRepository;
	
	@RequestMapping(value = "/authorize", method = RequestMethod.POST)
	public ResponseEntity<?> authorize(@RequestBody String pass){
		if (pass == "XXXXXXX") {
			return new ResponseEntity<>(HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}
	}

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

	
	@RequestMapping(value = "/rates/import", method = RequestMethod.POST)
	public ResponseEntity<?> importRatesFromFile(@RequestParam("uploadfile") MultipartFile uploadfile) {
		rateRepository.deleteAllRates();
        try {
			rateRepository.importFromFile(uploadfile);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.CONFLICT);
		}
        System.out.println("Import completed.");
        
        return new ResponseEntity<>(HttpStatus.OK);
	}
	
}
