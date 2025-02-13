package model.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.UUID;

import lombok.extern.slf4j.Slf4j;
import model.dto.MemberDto;
import util.CubeCrypto;

@Slf4j
public class MemberDao {
	private static class SingletonHolder {
		private static final MemberDao INSTANCE = new MemberDao();
	}

	private MemberDao() {
	}

	public static MemberDao getInstance() {
		return SingletonHolder.INSTANCE;
	}

	public Connection getConnection() throws SQLException {
		return DBConnectionPool.getInstance().getConnection();
	}

	// 멤버 가입
	public boolean insertMember(MemberDto dto) {
		String sql = "insert into users (email, nickname, phone) values (?, ?, ?)";
		String sql1 = "insert into passwords (user_email, password, salt) values (?, ?, ?)";
		int count = 0;

		try (Connection conn = getConnection();
				PreparedStatement ps = conn.prepareStatement(sql);
				PreparedStatement ps1 = conn.prepareStatement(sql1)) {
			conn.setAutoCommit(false);
			
			ps.setString(1, dto.email());
			ps.setString(2, dto.nick());
			ps.setString(3, dto.phone());
			
			ps1.setString(1, dto.email());
			String salt = UUID.randomUUID().toString().replaceAll("-", "");			
			ps1.setString(2, CubeCrypto.getInstance().makeSafePassword(dto.password(), salt));
			ps1.setString(3, salt);

			count += ps.executeUpdate();			
			count += ps1.executeUpdate();
			
			conn.commit();
			
			conn.setAutoCommit(true);
		} catch (SQLException e) {			
			log.error(">> " + e);
			return false;
		}
		
		// 총 2개의 행이 들어가야 성공이다.
		return count == 2 ? true : false;
	}
}