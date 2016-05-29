package com.example.mappers;

import java.util.Date;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.example.domain.Rate;

@Mapper
public interface RateMapper {
	public void addRate(Rate rate);
	public void addRateList(List<Rate> rates);
	public List<Rate> getAllRates();
	public void deleteAllRates();
	public List<Rate> getAllRatesInDateRange(@Param("from")Date from, @Param("to")Date to);
}
