package com.example.service.RateRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.domain.Rate;
import com.example.domain.RateRange;
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

	@Override
	public void addRate(Rate rate) {
		rateMapper.addRate(rate);
	}

	@Override
	public List<Rate> getAllRates() {
		List<Rate> rates =  rateMapper.getAllRates();
		return rates;
	}

	@Override
	public void deleteAllRates() {
		rateMapper.deleteAllRates();
	}

	@Override
	public List<Rate> getAllRatesInDateRange(RateRange rateRange) {
		List<Rate> rates = rateMapper.getAllRatesInDateRange(rateRange.getFrom(), rateRange.getTo());
		return rates;
	}

}
