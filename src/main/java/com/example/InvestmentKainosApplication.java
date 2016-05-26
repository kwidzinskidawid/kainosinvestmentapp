package com.example;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.example.service.RateRepository.RateRepository;

@SpringBootApplication
public class InvestmentKainosApplication implements CommandLineRunner {

	@Autowired
	private RateRepository rateRepository;
	
	public static void main(String[] args) {
		SpringApplication.run(InvestmentKainosApplication.class, args);
	}
	
	@Override
    public void run(String... args) throws Exception {
        rateRepository.importFromFile("/Users/Dave/workspace/InvestmentFund/src/main/resources/data.csv");
    }
}
