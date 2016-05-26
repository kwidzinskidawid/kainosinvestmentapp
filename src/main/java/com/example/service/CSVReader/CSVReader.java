package com.example.service.CSVReader;

import java.util.List;

import com.example.domain.Rate;

public interface CSVReader {
	public List<Rate> readFromFile(String filePath);
}
