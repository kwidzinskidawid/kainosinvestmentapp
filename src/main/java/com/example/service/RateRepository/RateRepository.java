package com.example.service.RateRepository;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.example.domain.Rate;
import com.example.domain.RateRange;

public interface RateRepository {
	public void importFromFile(MultipartFile uploadfile) throws Exception;
	public void addRate(Rate rate);
	public List<Rate> getAllRates();
	public void deleteAllRates();
	public List<Rate> getAllRatesInDateRange(RateRange rateRange);
}
