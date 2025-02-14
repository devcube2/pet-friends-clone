package model.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
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
		String sql = "insert into users (email, nick, phone) values (?, ?, ?)";
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

	// 로그인
	public MemberDto loginMember(MemberDto dto) {
		String sql = "select email, nick, phone, referral_code, address, password, salt from users as u join passwords as p on u.email = p.user_email where email = ?";

		try (Connection conn = getConnection(); PreparedStatement ps = conn.prepareStatement(sql)) {
			ps.setString(1, dto.email());

			try (ResultSet rs = ps.executeQuery()) {
				if (rs.next()) {
					// password + salt 값 계산해서 암호화된 password 와 같다면 로그인 성공
					if (CubeCrypto.getInstance().compareHash(dto.password(), rs.getString("salt"), rs.getString("password"))) {
						return new MemberDto(dto.email(), dto.password(), rs.getString("nick"), rs.getString("phone"), rs.getString("referral_code"), rs.getString("address"));
					}
				}
			}
		} catch (SQLException e) {
			log.error(">> " + e);
			return null;
		}
		
		return null;
	}
}