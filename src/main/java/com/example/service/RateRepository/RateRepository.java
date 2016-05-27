package com.example.service.RateRepository;

import java.util.List;

import com.example.domain.Rate;
import com.example.domain.RateRange;

public interface RateRepository {
	public void importFromFile(String filePath);
	public void addRate(Rate rate);
	public List<Rate> getAllRates();
	public void deleteAllRates();
	public List<Rate> getAllRatesInDateRange(RateRange rateRange);
}
