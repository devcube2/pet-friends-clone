package model.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import lombok.extern.slf4j.Slf4j;
import model.dto.ProductDto;

@Slf4j
public class ProductDao {
	private static class SingletonHolder {
		private static final ProductDao INSTANCE = new ProductDao();
	}

	private ProductDao() {
	}

	public static ProductDao getInstance() {
		return SingletonHolder.INSTANCE;
	}

	public Connection getConnection() throws SQLException {
		return DBConnectionPool.getInstance().getConnection();
	}

	// 상품 목록 조회
	public ArrayList<ProductDto> getProductList(ProductDto dto) {
		ArrayList<ProductDto> list = new ArrayList<>();

		String sql = "SELECT p.id AS product_id, p.name AS product_name, price, pet_type_category, pet_care_item_category1, pet_care_item_category2, c.name AS pet_care_item_category2_name, attributes, stock_quantity, discount, contents FROM products AS p JOIN categories AS c ON p.pet_care_item_category2 = c.id WHERE pet_type_category = ? AND pet_care_item_category1 = ? AND pet_care_item_category2 = ?";
		
		try (Connection conn = getConnection(); PreparedStatement ps = conn.prepareStatement(sql);) {
			ps.setString(1, dto.getPetType());
			ps.setString(2, dto.getPetCareItemCategory1());
			ps.setInt(3, dto.getPetCareItemCategory2());

			try (ResultSet rs = ps.executeQuery()) {
				while (rs.next()) {
					int id = rs.getInt("product_id");
					String name = rs.getString("product_name");
					int price = rs.getInt("price");
					String petType = rs.getString("pet_type_category");
					String petCareItemCategory1 = rs.getString("pet_care_item_category1");
					int petCareItemCategory2 = rs.getInt("pet_care_item_category2");
					String petCareItemCategory2s = rs.getString("pet_care_item_category2_name");
					String attributes = rs.getString("attributes");
					int stockQuantity = rs.getInt("stock_quantity");
					int discount = rs.getInt("discount");
					String contents = rs.getString("contents");
					
					ProductDto inputDto = new ProductDto(id, name, price, petType, petCareItemCategory1, petCareItemCategory2, petCareItemCategory2s, attributes, stockQuantity, discount, contents);
					
					list.add(inputDto);
				}
			}
		} catch (SQLException e) {
			log.error(">> " + e);
			return null;
		}

		return list;
	}
	
	// 상품 하나 조회
	public ProductDto getProduct(int productId) {
		ArrayList<ProductDto> list = new ArrayList<>();

		String sql = "SELECT p.id AS product_id, p.name AS product_name, price, pet_type_category, pet_care_item_category1, pet_care_item_category2, c.name AS pet_care_item_category2_name, attributes, stock_quantity, discount, contents FROM products AS p JOIN categories AS c ON p.pet_care_item_category2 = c.id WHERE p.id = ?";
		
		try (Connection conn = getConnection(); PreparedStatement ps = conn.prepareStatement(sql);) {
			ps.setInt(1, productId);

			try (ResultSet rs = ps.executeQuery()) {
				while (rs.next()) {
					int id = rs.getInt("product_id");
					String name = rs.getString("product_name");
					int price = rs.getInt("price");
					String petType = rs.getString("pet_type_category");
					String petCareItemCategory1 = rs.getString("pet_care_item_category1");
					int petCareItemCategory2 = rs.getInt("pet_care_item_category2");
					String petCareItemCategory2s = rs.getString("pet_care_item_category2_name");
					String attributes = rs.getString("attributes");
					int stockQuantity = rs.getInt("stock_quantity");
					int discount = rs.getInt("discount");
					String contents = rs.getString("contents");
					
					return new ProductDto(id, name, price, petType, petCareItemCategory1, petCareItemCategory2, petCareItemCategory2s, attributes, stockQuantity, discount, contents);				
				}
			}
		} catch (SQLException e) {
			log.error(">> " + e);
			return null;
		}

		return null;
	}
}