package com.app.ticketr_backend;

import java.net.URI;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TicketrBackendApplication {

	public static void main(String[] args) {
		applyRailwayDatasourceFallback();
		SpringApplication.run(TicketrBackendApplication.class, args);
	}

	private static void applyRailwayDatasourceFallback() {
		if (hasText(System.getenv("SPRING_DATASOURCE_URL")) || hasText(System.getProperty("spring.datasource.url"))) {
			return;
		}

		String rawRailwayUrl = firstNonBlank(
				System.getenv("MYSQL_PUBLIC_URL"),
				System.getenv("MYSQL_URL"),
				System.getenv("DATABASE_URL"));

		if (!hasText(rawRailwayUrl) || !rawRailwayUrl.startsWith("mysql://")) {
			return;
		}

		try {
			URI uri = URI.create(rawRailwayUrl);
			String host = uri.getHost();
			int port = uri.getPort() > 0 ? uri.getPort() : 3306;
			String database = uri.getPath() != null ? uri.getPath().replaceFirst("^/", "") : "";
			String userInfo = uri.getRawUserInfo();

			if (!hasText(host) || !hasText(database) || !hasText(userInfo) || !userInfo.contains(":")) {
				return;
			}

			String[] creds = userInfo.split(":", 2);
			String username = decode(creds[0]);
			String password = decode(creds[1]);

			String query = uri.getRawQuery();
			String jdbcUrl = "jdbc:mysql://" + host + ":" + port + "/" + database
					+ "?" + (hasText(query) ? query + "&" : "")
					+ "useSSL=true&allowPublicKeyRetrieval=true&serverTimezone=UTC";

			System.setProperty("spring.datasource.url", jdbcUrl);

			if (!hasText(System.getenv("SPRING_DATASOURCE_USERNAME")) && !hasText(System.getProperty("spring.datasource.username"))) {
				System.setProperty("spring.datasource.username", username);
			}
			if (!hasText(System.getenv("SPRING_DATASOURCE_PASSWORD")) && !hasText(System.getProperty("spring.datasource.password"))) {
				System.setProperty("spring.datasource.password", password);
			}
		} catch (Exception ignored) {
			// Keep default datasource resolution if parsing fails.
		}
	}

	private static String firstNonBlank(String... values) {
		for (String value : values) {
			if (hasText(value)) {
				return value;
			}
		}
		return null;
	}

	private static String decode(String value) {
		return URLDecoder.decode(value, StandardCharsets.UTF_8);
	}

	private static boolean hasText(String value) {
		return value != null && !value.trim().isEmpty();
	}

}
