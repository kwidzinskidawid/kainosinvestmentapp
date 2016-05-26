package com.example.service;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.domain.Rate;

@Service
public class CSVReaderImpl implements CSVReader{
	public static List<Rate> readFromFile(String filePath) {
		List<Rate> result = new ArrayList<Rate>();
		
		BufferedReader br = null;
		String line = "";
		SimpleDateFormat dateFormatter = new SimpleDateFormat("dd/MM/yyyy");

		int count = 0;
		try {

			br = new BufferedReader(new FileReader(filePath));
			br.readLine();
			while ((line = br.readLine()) != null) {

				String[] rate = line.split(",");

				Rate newRate = new Rate();
				newRate.setDate(dateFormatter.parse(rate[0]));
				newRate.setValue(Float.parseFloat(rate[1]));
				
				result.add(newRate);
				count++;
				if(count > 20)
					break;

			}
			
			br.close();
			
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (ParseException e) {
			e.printStackTrace();
		}

		return result;
	}
}
