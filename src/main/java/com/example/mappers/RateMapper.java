package com.example.mappers;

import java.util.Date;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.example.domain.Rate;

@Mapper
public interface RateMapper {
	void addRate(Rate rate);
	List<Rate> getAllRates();
	void deleteAllRates();
	List<Rate> getAllRatesInDateRange(@Param("from")Date from, @Param("to")Date to);
}
