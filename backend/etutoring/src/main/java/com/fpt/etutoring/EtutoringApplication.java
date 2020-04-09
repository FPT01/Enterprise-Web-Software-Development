package com.fpt.etutoring;

import com.fpt.etutoring.mail.EmailService;
import com.fpt.etutoring.storage.impl.StorageProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = {"com.fpt.etutoring.dao", "com.fpt.etutoring.entity"})
@EnableConfigurationProperties(StorageProperties.class)
public class EtutoringApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(EtutoringApplication.class, args);
	}

	@Autowired
	private EmailService emailService;

	@Override
	public void run(String... args) throws Exception {
		//emailService.sendSimpleMessage("phonglhtcs19002@fpt.edu.vn", "Test");
//		String pass = StringUtil.generateCommonLangPassword();
//		System.out.println(">>>>> pass: " + pass);
	}
}
