package model.dao;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URISyntaxException;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Properties;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

import jakarta.servlet.ServletConfig;
import lombok.extern.slf4j.Slf4j;
import util.CubeCrypto;
import util.ServerConfig;

@Slf4j
public class DBConnectionPool {
	private static DBConnectionPool instance;

	private byte[] key = { (byte) 0x67, (byte) 0x6f, (byte) 0x7a, (byte) 0x6a, (byte) 0x64, (byte) 0x69, (byte) 0x38,
			(byte) 0x30, (byte) 0x67, (byte) 0x6f, (byte) 0x7a, (byte) 0x6a, (byte) 0x64, (byte) 0x69, (byte) 0x38,
			(byte) 0x30 };
	private byte[] iv = { (byte) 0x67, (byte) 0x6f, (byte) 0x7a, (byte) 0x6a, (byte) 0x64, (byte) 0x69, (byte) 0x38,
			(byte) 0x30, (byte) 0x67, (byte) 0x6f, (byte) 0x7a, (byte) 0x6a, (byte) 0x64, (byte) 0x69, (byte) 0x38,
			(byte) 0x30 };

	private HikariConfig config;
	private HikariDataSource dataSource;

	private DBConnectionPool(ServletConfig servletConfig) {
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");

			Properties prop = ServerConfig.getServerConfig(servletConfig);

			String url = prop.getProperty("database.url");
			String username = prop.getProperty("database.username");
			String encryptedPassword = prop.getProperty("database.password");
			String password = CubeCrypto.getInstance().decrypt(encryptedPassword, key, iv);

			int maxPoolSize = Integer.parseInt(prop.getProperty("database.maxPoolSize"));
			int minIdle = Integer.parseInt(prop.getProperty("database.minIdle"));
			int idleTimeout = Integer.parseInt(prop.getProperty("database.idleTimeout"));
			int maxLifeTime = Integer.parseInt(prop.getProperty("database.maxLifeTime"));
			int connectionTimeout = Integer.parseInt(prop.getProperty("database.connectionTimeout"));

			log.debug("HikariCP url: {}", url);
			log.debug("HikariCP username: {}", username);
//			log.debug("HikariCP password: {}", password);
			log.debug("HikariCP maxPoolSize: {}", maxPoolSize);
			log.debug("HikariCP minIdle: {}", minIdle);
			log.debug("HikariCP idleTimeout: {}", idleTimeout);
			log.debug("HikariCP maxLifeTime: {}", maxLifeTime);
			log.debug("HikariCP connectionTimeOut: {}", connectionTimeout);

			config = new HikariConfig();

			config.setJdbcUrl(url);
			config.setUsername(username);
			config.setPassword(password);

			config.setMaximumPoolSize(maxPoolSize); // 커넥션풀 최대 크기
			config.setMinimumIdle(minIdle); // 최소 대기 커넥션 수
			config.setIdleTimeout(idleTimeout); // 커넥션이 지정한 시간 이상 유휴 상태면 제거
			config.setMaxLifetime(maxLifeTime); // 한번 맺은 커넥션을 얼마나 유지할지 결정한다. 설정된 시간이 지나면 커넥션 새로 생성하여 교체한다.
			config.setConnectionTimeout(connectionTimeout); // 커넥션 요청 대기 시간 30초
			config.setPoolName("HrdHikariPool"); // 커넥션 풀 이름 설정 (디버깅시 활용)

			dataSource = new HikariDataSource(config);
		} catch (ClassNotFoundException e) {
			log.error("JDBC Driver not found : {}", e.getMessage());
		} catch (MalformedURLException e) {
			log.error("MalformedURLException : {}", e.getMessage());
		} catch (FileNotFoundException e) {
			log.error("FileNotFoundException : {}", e.getMessage());
		} catch (URISyntaxException e) {
			log.error("URISyntaxException : {}", e.getMessage());
		} catch (IOException e) {
			log.error("IOException : {}", e.getMessage());
		}
	}

	public static void setInstance(ServletConfig servletConfig) throws Exception {
		if (instance == null) {
			synchronized (DBConnectionPool.class) {
				if (instance == null) {
					instance = new DBConnectionPool(servletConfig);
				}
			}
		}
	}

	public static DBConnectionPool getInstance() {
		if (instance == null) {
			throw new IllegalStateException("DBConnectionPool is not initialized");
		}
		return instance;
	}

	public Connection getConnection() throws SQLException {
		return dataSource.getConnection();
	}
}