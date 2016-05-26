package com.example.domain;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;


public class Rate {

	private Integer id;
	 
	@JsonFormat(pattern="dd/MM/yyyy")
	private Date date;
	
	private float value;
	
	public Rate() {
		
	}
	public Rate(Date date, float value) {
		this.date = date;
		this.value = value;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public float getValue() {
		return value;
	}
	public void setValue(float value) {
		this.value = value;
	}
}
