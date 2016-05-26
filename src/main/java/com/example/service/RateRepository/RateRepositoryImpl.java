package com.example.service.RateRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.domain.Rate;
import com.example.mappers.RateMapper;
import com.example.service.CSVReader.CSVReader;

@Service
public class RateRepositoryImpl implements RateRepository {

	@Autowired
	private CSVReader csvReader;
	@Autowired
	private RateMapper rateMapper;
	
	@Override
	public void importFromFile(String filePath) {
		List<Rate> rates = csvReader.readFromFile(filePath);
		
		for (Rate rate : rates) {
			rateMapper.addRate(rate);
		}
	}

}
