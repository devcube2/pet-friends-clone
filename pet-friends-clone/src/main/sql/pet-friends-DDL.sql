drop database if exists petfriends;
create database petfriends;
use petfriends;

-- 유저(users) 테이블
CREATE TABLE users (
    id            INT PRIMARY KEY AUTO_INCREMENT,
    email         VARCHAR(128) UNIQUE NOT NULL,  -- 이메일
    nick      VARCHAR(64)  NOT NULL,             -- 별명
    phone         VARCHAR(16)  UNIQUE NOT NULL,  -- 휴대폰 번호
    referral_code VARCHAR(64),                   -- 추천코드(아직 사용안함)
    address       VARCHAR(1024),                 -- 배송지 주소 목록(json)
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,                            -- 계정정보 생성일
    updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- 계정정보 변경일
);
insert into users (email, nick, phone) values ('jejeje888@naver.com', '데브큐브', '010-1111-2222');

-- 비밀번호(passwords) 테이블
CREATE TABLE passwords (
    id         INT PRIMARY KEY AUTO_INCREMENT,
    user_email VARCHAR(128) UNIQUE NOT NULL,   -- 이메일
    password   VARCHAR(255) NOT NULL,          -- 암호화된 비밀번호
    salt       VARCHAR(64)  NOT NULL,          -- salt 값
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- 비밀번호 변경일
    FOREIGN KEY (user_email) REFERENCES users(email) ON DELETE CASCADE          -- 외래키 제약조건
);
-- 샘플값은 salt 같아도 상관없다. mysql 은 uuid v1 이라 짧은 시간에 호출하면 같은값이 나온다고 함.
set @salt = UUID();
insert into passwords (user_email, password, salt) values ('jejeje888@naver.com', TO_BASE64(UNHEX(SHA2(CONCAT('1234', @salt), 256))), @salt);

-- 카테고리(categories) 테이블
CREATE TABLE categories (
    id   INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) UNIQUE NOT NULL     -- 카테고리명
);
insert into categories (name) values ('키튼');
insert into categories (name) values ('어덜트');
insert into categories (name) values ('시니어');
insert into categories (name) values ('전연령');
insert into categories (name) values ('주식캔');
insert into categories (name) values ('파우치');
insert into categories (name) values ('건식사료');
insert into categories (name) values ('에어동결사료');
insert into categories (name) values ('체중조절');
insert into categories (name) values ('요로기계');
insert into categories (name) values ('헤어볼');
insert into categories (name) values ('구강치아');
insert into categories (name) values ('피부피모');
insert into categories (name) values ('장소화');
insert into categories (name) values ('면역력');
insert into categories (name) values ('기타');
insert into categories (name) values ('맘마샘플');
insert into categories (name) values ('처방식');
insert into categories (name) values ('간식캔');
insert into categories (name) values ('간식파우치');
insert into categories (name) values ('동결건조');
insert into categories (name) values ('수제간식');
insert into categories (name) values ('캣닢캣그라스');
insert into categories (name) values ('저키');
insert into categories (name) values ('스낵');
insert into categories (name) values ('통살소시지');
insert into categories (name) values ('덴탈간식');
insert into categories (name) values ('파우더토핑');
insert into categories (name) values ('우유분유음료');
insert into categories (name) values ('영양기능');
insert into categories (name) values ('모래');
insert into categories (name) values ('낚시대레이져');
insert into categories (name) values ('공인형');
insert into categories (name) values ('터널사냥본능');
insert into categories (name) values ('스크래쳐박스');
insert into categories (name) values ('칫솔치약');
insert into categories (name) values ('미용관리');
insert into categories (name) values ('목욕용품');
insert into categories (name) values ('위생용품');
insert into categories (name) values ('의류악세사리');
insert into categories (name) values ('하네스');
insert into categories (name) values ('이동장유모차');
insert into categories (name) values ('급식기급수기');
insert into categories (name) values ('정수자동급식기');
insert into categories (name) values ('화장실배변보조');
insert into categories (name) values ('하우스방석');
insert into categories (name) values ('캣타워캣휠');
insert into categories (name) values ('사료통사료샵');
insert into categories (name) values ('넥카라수술');
insert into categories (name) values ('반려인용품');
insert into categories (name) values ('파티');
insert into categories (name) values ('울타리안전문');
insert into categories (name) values ('먹이퍼즐');
insert into categories (name) values ('건강관리');
insert into categories (name) values ('자동장난감');

-- 상품(products) 테이블
CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,  -- 상품명
    price INT,                          -- 상품가격
    pet_type_category ENUM('강아지', '고양이', '공용'),
    pet_care_item_category1 ENUM('사료', '간식', '용품'),
    pet_care_item_category2 INT,        -- 주식캔, 어덜트, 건식사료 등등..
    attributes VARCHAR(1024),           -- 브랜드, 급여연령, 기능 등등.. json 으로 들어감 (컨트롤러에서 필터링시 사용) (현재 안씀)    
    stock_quantity INT NOT NULL,        -- 재고 수량 (현재 안씀)
    discount INT NOT NULL CHECK (discount >= 0 AND discount < 100),  -- 할인율 (0% ~ 99%)
    contents VARCHAR(1024) NOT NULL,    -- 상단 이미지 url 목록, 본문 상세정보 이미지 url 목록, 본문 텍스트 정보 등.. 필요한 여러 데이터가 json 으로 들어감 (컨트롤러에서 파싱하여 전송)
    FOREIGN KEY (pet_care_item_category2) REFERENCES categories(id) ON DELETE SET NULL  -- 외래 키 설정
);
insert into products (name, price, pet_type_category, pet_care_item_category1, pet_care_item_category2, attributes, stock_quantity, discount, contents) values ('벤티 캣 참치&닭가슴살 캔 90g', 1800, '고양이', '사료', 5, '', 0, 0, '{"slideList":["slide1.jpg"], "mainList":["main1.webp"]}');
insert into products (name, price, pet_type_category, pet_care_item_category1, pet_care_item_category2, attributes, stock_quantity, discount, contents) values ('로얄캐닌 캣 마더&베이비 캔 100g', 2590, '고양이', '사료', 5, '', 0, 0, '{"slideList":["slide1.jpg","slide2.jpg"], "mainList":["main1.webp","main2.webp"]}');
insert into products (name, price, pet_type_category, pet_care_item_category1, pet_care_item_category2, attributes, stock_quantity, discount, contents) values ('알모네이쳐 캣 닭고기&참치 캔', 2600, '고양이', '사료', 5, '', 0, 0, '{"slideList":["slide1.jpg","slide2.jpg","slide3.jpg"], "mainList":["main1.webp","main2.webp","main3.webp","main4.webp","main5.webp","main6.webp","main7.webp"]}');
insert into products (name, price, pet_type_category, pet_care_item_category1, pet_care_item_category2, attributes, stock_quantity, discount, contents) values ('알모네이쳐 캣 대서양참치 캔 70g', 2600, '고양이', '사료', 5, '', 0, 0, '{"slideList":["slide1.webp","slide2.jpg","slide3.jpg","slide4.jpg"], "mainList":["main1.webp","main2.webp","main3.webp","main4.webp","main5.webp","main6.webp","main7.webp"]}');

insert into products (name, price, pet_type_category, pet_care_item_category1, pet_care_item_category2, attributes, stock_quantity, discount, contents) values ('에이스 열빙어트릿 80g', 16900, '고양이', '간식', 24, '', 0, 0, '{"slideList":["slide1.jpg"], "mainList":[]}');
insert into products (name, price, pet_type_category, pet_care_item_category1, pet_care_item_category2, attributes, stock_quantity, discount, contents) values ('에이스 치킨트릿 135g', 17900, '고양이', '간식', 24, '', 0, 0, '{"slideList":["slide1.jpg"], "mainList":[]}');
insert into products (name, price, pet_type_category, pet_care_item_category1, pet_care_item_category2, attributes, stock_quantity, discount, contents) values ('메가파이브 연어 50g', 2900, '고양이', '간식', 24, '', 0, 0, '{"slideList":["slide1.jpg"], "mainList":[]}');
insert into products (name, price, pet_type_category, pet_care_item_category1, pet_care_item_category2, attributes, stock_quantity, discount, contents) values ('이나바 캣 챠오 츄르비 닭가슴살&야끼가츠오 10g*4p', 2290, '고양이', '간식', 24, '', 0, 0, '{"slideList":["slide1.png"], "mainList":[]}');

insert into products (name, price, pet_type_category, pet_care_item_category1, pet_care_item_category2, attributes, stock_quantity, discount, contents) values ('집에가야돼 타이벡 챠락챠락스틱 장난감 2종 세트', 12000, '고양이', '용품', 32, '', 0, 0, '{"slideList":["slide1.png"], "mainList":[]}');
insert into products (name, price, pet_type_category, pet_care_item_category1, pet_care_item_category2, attributes, stock_quantity, discount, contents) values ('호랑이 낚시대', 18000, '고양이', '용품', 32, '', 0, 0, '{"slideList":["slide1.webp"], "mainList":[]}');
insert into products (name, price, pet_type_category, pet_care_item_category1, pet_care_item_category2, attributes, stock_quantity, discount, contents) values ('반려일상 고수의 낚시대 셀프 와이어', 6900, '고양이', '용품', 32, '', 0, 0, '{"slideList":["slide1.webp"], "mainList":[]}');

-- 주문(orders) 테이블
CREATE TABLE orders (
    id          INT PRIMARY KEY AUTO_INCREMENT,       -- 주문 고유 ID
    user_id     INT NOT NULL,                         -- 사용자 고유 ID (FK)    
    status      ENUM('결제대기', '결제취소', '결제완료', '배송중', '배송완료', '반품대기', '반품중', '반품완료') NOT NULL DEFAULT '결제대기',  -- 주문 상태
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- 주문 일시
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE  -- 외래 키 설정
);

-- 주문 상세(order_item) 테이블
CREATE TABLE order_item (
    id        INT PRIMARY KEY AUTO_INCREMENT,  -- 주문 상세 고유 ID
    order_id  INT NOT NULL,                    -- 주문 고유 ID (FK)
    good_id   INT,                             -- 상품 고유 ID (FK)
    good_name VARCHAR(255) NOT NULL,           -- 주문 당시 상품명 (이력 유지)
    quantity  INT NOT NULL,                    -- 주문 수량 (이력 유지)
    price     INT NOT NULL,                    -- 주문 당시 개별 상품 가격 (이력 유지)
    total_price INT NOT NULL,                  -- 주문 당시 총 주문 금액 (이력 유지)
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,  -- 외래 키 설정
    FOREIGN KEY (good_id) REFERENCES products(id) ON DELETE SET NULL    -- 외래 키 설정 (상품 삭제되면 null)
);
