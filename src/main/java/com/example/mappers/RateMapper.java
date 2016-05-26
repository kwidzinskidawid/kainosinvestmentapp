package com.example.mappers;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.domain.Rate;

@Mapper
public interface RateMapper {
	void addRate(Rate rate);
	List<Rate> getAllRates();
}
