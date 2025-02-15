package model.dto;

import lombok.Data;

@Data
public class ProductDto {
	private String name;
	private int price;
	private String petType;
	private String petCareItemCategory1;
	private int petCareItemCategory2;
	private String petCareItemCategory2s;
	private String attributes;
	private int stockQuantity;
	private int discount;
	private String contents;
	
	public ProductDto(String name, int price, String petType, String petCareItemCategory1, int petCareItemCategory2, String petCareItemCategory2s, String attributes, int stockQuantity, int discount, String contents) {
		setName(name);
		setPrice(price);
		setPetType(petType);
		setPetCareItemCategory1(petCareItemCategory1);
		setPetCareItemCategory2(petCareItemCategory2);
		setPetCareItemCategory2s(petCareItemCategory2s);
		setAttributes(attributes);
		setStockQuantity(stockQuantity);
		setDiscount(discount);
		setContents(contents);
	}
	
	public ProductDto(String name, int price, String petType, String petCareItemCategory1, int petCareItemCategory2, String attributes, int stockQuantity, int discount, String contents) {
		setName(name);
		setPrice(price);
		setPetType(petType);
		setPetCareItemCategory1(petCareItemCategory1);
		setPetCareItemCategory2(petCareItemCategory2);
		setAttributes(attributes);
		setStockQuantity(stockQuantity);
		setDiscount(discount);
		setContents(contents);
	}
	
	public ProductDto(String petType, String petCareItemCategory1, int petCareItemCategory2) {	
		setPetType(petType);
		setPetCareItemCategory1(petCareItemCategory1);
		setPetCareItemCategory2(petCareItemCategory2);
	}
}