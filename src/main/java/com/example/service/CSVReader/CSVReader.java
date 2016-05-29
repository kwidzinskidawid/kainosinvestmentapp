package com.example.service.CSVReader;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.example.domain.Rate;

public interface CSVReader {
	public List<Rate> readFromFile(MultipartFile uploadfile) throws Exception;
}
