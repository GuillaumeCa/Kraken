package com.kraken.gcfa;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class GcfaBackApplication {

	@GetMapping(value = "/hello")
	public String hello() {
		return "world";
	}


	public static void main(String[] args) {
		SpringApplication.run(GcfaBackApplication.class, args);
	}
}
