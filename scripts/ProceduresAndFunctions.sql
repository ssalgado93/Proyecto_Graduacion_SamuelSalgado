USE plazitanet;
SET GLOBAL log_bin_trust_function_creators = 1; #Para la creacion de finciones deterministas

#funcion que crea un codigo aleatorio dato un tamaño 
DELIMITER $$
CREATE FUNCTION `RandString`(length SMALLINT(3)) RETURNS varchar(100) CHARSET UTF8MB4
BEGIN
    SET @returnStr = '';
    SET @allowedChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopkrstuwxyz';
    SET @i = 0;

    WHILE (@i < length) DO
        SET @returnStr = CONCAT(@returnStr, substring(@allowedChars, FLOOR(Rand() * LENGTH(@allowedChars) + 1), 1));
        SET @i = @i + 1;
    END WHILE;
    RETURN @returnStr;
END$$

#Procedimiento almacenado que actualiza el codigo en la tabla User
DELIMITER $$
CREATE PROCEDURE createCode (email_user VARCHAR(100))
BEGIN
    UPDATE user SET var_code = (SELECT RandString(7)) WHERE  var_email = email_user;
	SELECT * FROM user WHERE var_email = email_user;
END$$

#ejemplo de uso del procedimiento
CALL createCode("sess9496@hotmail.es");

-- Producto Almacenado 
DELIMITER //
CREATE PROCEDURE vistaProduc(id int)
BEGIN
UPDATE PRODUCT SET int_views=(PRODUCT.int_views)+1 WHERE id_product=id; 
END//

## LISTAR COMENTARIOS
DELIMITER &&
CREATE PROCEDURE obtenerComentarios(IN id int)
BEGIN
     SELECT user.var_name, user.var_lastname, commentary.text_contents, date_format(tim_date,'%d/%m/%Y') AS dateComment,time_format(tim_date,'%H:%i')  AS hourComment
		FROM commentary 
		INNER JOIN user ON user.id_user=commentary.fk_id_user
		WHERE commentary.fk_id_product = id ORDER BY commentary.tim_date DESC;
END&&

##PROMEDIO DE CALIFICACION
DELIMITER &&
CREATE PROCEDURE prom(IN id int)
BEGIN
    SELECT CAST(AVG(tin_score)  AS DECIMAL(10,1)) AS PROMEDIO FROM qualification WHERE fk_id_user_qualified=id;
END&&


-- Producto Almacenado Lista de mensajes
DROP PROCEDURE IF EXISTS listMessage;
DELIMITER //
CREATE PROCEDURE listMessage(id int,idUser int)
BEGIN
 UPDATE message SET bit_status=1 WHERE fk_id_chat = id AND fk_id_user=idUser;
 SELECT date_format(tim_date,'%d/%m/%Y') as dateMessenge,time_format(tim_date,'%H:%i') AS hourMessenge, IF(bit_status=0,0,1) AS bit_status, text_contents, fk_id_user FROM MESSAGE WHERE fk_id_chat=id ORDER BY tim_date ASC; 
END//

-- CALL listMessage(4,1);

-- Otra forma de listar mensajes
/*
DELIMITER //
CREATE PROCEDURE listMessage2(id int,id2 int)
BEGIN
 SELECT * FROM message WHERE fk_id_chat=id and fk_id_user=id2  ORDER BY tim_date asc; 
END//

CALL listMessage2(4,3);
*/


-- Funcion para crear un chat vacio
DROP PROCEDURE IF EXISTS sp_newChat;
DELIMITER $$
CREATE PROCEDURE sp_newChat(id_product BIGINT UNSIGNED, id_user_buyer BIGINT UNSIGNED, id_user_seller BIGINT UNSIGNED)
BEGIN
	DECLARE id BIGINT UNSIGNED;
    DECLARE status TINYINT UNSIGNED;

	SELECT id_chat INTO id FROM CHAT WHERE fk_id_product = id_product AND fk_id_user_buyer = id_user_buyer AND fk_id_user_seller = id_user_seller;
	
    IF id THEN
		SELECT 202 INTO status; 
		SELECT id AS id_chat, status;
    ELSE
		INSERT INTO CHAT (modification_date, fk_id_product, fk_id_user_buyer, fk_id_user_seller) 
			VALUES(CURRENT_TIMESTAMP(),id_product,id_user_buyer,id_user_seller);
		
        SELECT 200 INTO status;
		SELECT last_insert_id() AS id_chat, status;
    END IF;
	
END$$

-- CALL sp_newChat(101, 1, 3);

-- Mensaje nuevo
DROP PROCEDURE IF EXISTS sp_sendMessage;
DELIMITER $$
CREATE PROCEDURE sp_sendMessage(contents TEXT, id_chat BIGINT UNSIGNED, id_user BIGINT UNSIGNED)
BEGIN
	INSERT INTO MESSAGE(tim_date, bit_status, text_contents, fk_id_chat, fk_id_user) 
		VALUES(CURRENT_TIMESTAMP() ,0 , contents, id_chat, id_user);
	UPDATE CHAT SET modification_date = CURRENT_TIMESTAMP() WHERE CHAT.id_chat = id_chat;
	SELECT date_format(tim_date,'%d/%m/%Y') AS dateMessenge,time_format(tim_date,'%H:%i') AS hourMessenge,IF(bit_status=0,0,1) AS bit_status, text_contents, fk_id_user FROM MESSAGE WHERE fk_id_chat=id_chat ORDER BY tim_date ASC;
END$$

DROP FUNCTION IF EXISTS fn_evaluateName;
DELIMITER $$
CREATE FUNCTION fn_evaluateName(user_id BIGINT UNSIGNED, buyer_id BIGINT UNSIGNED, seller_id BIGINT UNSIGNED)
	RETURNS VARCHAR(50)
BEGIN
	DECLARE user_name VARCHAR(50);
	IF user_id = buyer_id THEN
		SELECT CONCAT(var_name,' ',var_lastname) INTO user_name FROM USER WHERE id_user = seller_id;
		RETURN user_name;
    ELSE
		SELECT CONCAT(var_name,' ',var_lastname) INTO user_name FROM USER WHERE id_user = buyer_id;
		RETURN user_name;
	END IF;
END$$

DROP FUNCTION IF EXISTS fn_unread_messages;
DELIMITER $$
CREATE FUNCTION fn_unread_messages(id_chat BIGINT UNSIGNED, id_user BIGINT UNSIGNED)
	RETURNS INTEGER
BEGIN
	DECLARE unread_messages INTEGER;
	SELECT COUNT(*) INTO unread_messages FROM MESSAGE WHERE fk_id_chat = id_chat AND bit_status = 0 AND fk_id_user != id_user;
    RETURN unread_messages;
END$$

DROP FUNCTION IF EXISTS fn_last_message;
DELIMITER $$
CREATE FUNCTION fn_last_message(id_chat BIGINT UNSIGNED)
	RETURNS TEXT
BEGIN
	DECLARE last_message TEXT;
    SELECT text_contents INTO last_message FROM MESSAGE WHERE fk_id_chat=id_chat ORDER BY MESSAGE.id_message DESC LIMIT 1;
    RETURN last_message;

END$$

DROP FUNCTION IF EXISTS fn_determineRole;
DELIMITER $$
CREATE FUNCTION fn_determineRole(user_id BIGINT UNSIGNED, buyer_id BIGINT UNSIGNED, seller_id BIGINT UNSIGNED)
	RETURNS VARCHAR(10)
BEGIN
	DECLARE user_rol VARCHAR(10);
	IF user_id = buyer_id THEN
		SELECT "Vendedor" INTO user_rol;
		RETURN user_rol;
    ELSE
		SELECT "Cliente" INTO user_rol;
		RETURN user_rol;
	END IF;
END$$

-- Traer datos de los chats
DROP PROCEDURE IF EXISTS sp_chatData;
DELIMITER $$
CREATE PROCEDURE sp_chatData(id BIGINT UNSIGNED)
BEGIN
	SELECT CHAT.id_chat,(SELECT user.var_name FROM USER where id_user = CHAT.fk_id_user_buyer) AS fk_id_user_buyer,
    (SELECT user.var_name FROM USER where id_user = CHAT.fk_id_user_seller) AS fk_id_user_seller, fn_unread_messages(CHAT.id_chat, USER.id_user) AS no_leidos, fn_last_message(CHAT.id_chat) AS ultimo_mensaje, fn_determineRole(USER.id_user, CHAT.fk_id_user_seller, CHAT.fk_id_user_buyer) AS Rol ,
	fn_evaluateName(USER.id_user, CHAT.fk_id_user_seller, CHAT.fk_id_user_buyer) AS Nombre, CHAT.fk_id_user_buyer AS id_comprador, CHAT.fk_id_user_seller AS id_vendedor,
	CHAT.fk_id_product, PRODUCT.var_name AS Producto, PHOTOGRAPHS.var_name AS Foto
	FROM USER
    INNER JOIN CHAT ON USER.id_user = CHAT.fk_id_user_seller OR USER.id_user = CHAT.fk_id_user_buyer
    INNER JOIN PRODUCT ON PRODUCT.id_product = CHAT.fk_id_product
    INNER JOIN PHOTOGRAPHS ON PHOTOGRAPHS.fk_id_product = PRODUCT.id_product
    WHERE USER.id_user = id
    ORDER BY CHAT.modification_date DESC;
END$$


-- Obtener tiempo de expiración de anuncios
DROP FUNCTION IF EXISTS fn_getExpiryTime;
DELIMITER $$
CREATE FUNCTION fn_getExpiryTime()
		RETURNS SMALLINT
	BEGIN
		RETURN (SELECT expiration_period FROM INFORMATION LIMIT 1);
END$$


-- Actualizar el tiempo de expiración de anuncios
DROP PROCEDURE IF EXISTS sp_updateExpiryTime;
DELIMITER $$
CREATE PROCEDURE sp_updateExpiryTime(days SMALLINT)
BEGIN
	UPDATE PRODUCT SET expiration_date = DATE_ADD(publication_date, interval days day);
	UPDATE INFORMATION SET expiration_period=days;
END$$

SET SQL_SAFE_UPDATES = 1;

--

-- SELECT COUNT(*) FROM QUALIFICATION WHERE (fk_id_user_review = 4 AND fk_id_user_qualified = 5);
DROP PROCEDURE IF EXISTS sp_rateUser;
DELIMITER $$
CREATE PROCEDURE sp_rateUser(customer BIGINT UNSIGNED, seller BIGINT UNSIGNED, score TINYINT)
BEGIN
	DECLARE existQualification TINYINT;
    SELECT COUNT(*) INTO existQualification FROM QUALIFICATION WHERE fk_id_user_review = customer AND fk_id_user_qualified = seller;
    
	IF existQualification = 0 THEN
		INSERT INTO QUALIFICATION(fk_id_user_review,fk_id_user_qualified,tin_score) VALUES(customer, seller, score);
        SELECT "Nueva calificación agregada" AS msg;
    ELSE
        UPDATE QUALIFICATION SET tin_score = score WHERE fk_id_user_review = customer AND fk_id_user_qualified = seller;
        SELECT "Calificación actualizada" AS msg;
    END IF;
END$$

-- Procedimiento para obtener si un chat cumple los requisitos de mostrar las calificaciones
DROP FUNCTION IF EXISTS fn_isQualifying;
DELIMITER $$
CREATE FUNCTION fn_isQualifying(chat BIGINT UNSIGNED)
	RETURNS TINYINT
BEGIN
	DECLARE customer INT UNSIGNED;
    DECLARE seller INT UNSIGNED;
    DECLARE countCustomer INT UNSIGNED;
    DECLARE countSeller INT UNSIGNED;

	SELECT fk_id_user_buyer, fk_id_user_seller INTO customer,seller FROM CHAT WHERE id_chat = chat;
    
	SELECT COUNT(*) INTO countCustomer FROM MESSAGE WHERE fk_id_user = customer AND fk_id_chat = chat;
    SELECT COUNT(*) INTO countSeller FROM MESSAGE WHERE fk_id_user = seller AND fk_id_chat = chat;
    IF countCustomer > 2 AND countSeller > 2 THEN
		RETURN 1;
	ELSE
		RETURN 0;
	END IF;
END $$

##BORRAR IMAGENES EN EDICION DE PRODUCTO

DELIMITER //
CREATE PROCEDURE deletePhotos(IN nombre VARCHAR(200))
BEGIN
	DELETE p.* FROM photographs p WHERE id_photographs IN
		(SELECT id_photographs FROM 
				(SELECT id_photographs FROM photographs WHERE var_name=nombre)x);
END //


DELIMITER //
CREATE PROCEDURE listDenuncias12(id int)
BEGIN
 SELECT*FROM COMPLAINT where fk_id_user_complaining=id ORDER BY tim_date ASC;
END//

#Actualizar Cat. de los productos a indefinida 
DELIMITER //
CREATE PROCEDURE UpdateCategory(IN id bigint)
BEGIN
	UPDATE product SET fk_id_product_category=
			(SELECT id_product_category FROM 
					(SELECT  id_product_category FROM product_category WHERE var_name="Indefinida")x) 
	WHERE fk_id_product_category= id;
END//

/*
--Listado de denuncias por usuario por id
delimiter //
create  procedure ListadoUsuarios(id int)
BEGIN
select * from user
where exists (select * from complaint
where fk_id_user=id_user)
and id_user= id;
end//
*/
/*
DROP PROCEDURE IF EXISTS eliminarDenuncia;
delimiter //
create  procedure eliminarDenuncia(id int)
BEGIN
 DELETE FROM complaint where id_COMPLAINT=id; 
end//
*/

DELIMITER //
CREATE PROCEDURE verifiacionVisitas()
BEGIN
    DECLARE amount tinyint;
    DECLARE amountViews bigint;
	SELECT count(*) INTO amount FROM VIEWS
		WHERE date_views=current_date();
    SELECT amount_views INTO amountViews FROM VIEWS
		WHERE date_views=current_date();
    IF amount = 0 THEN
		INSERT INTO VIEWS VALUES(1,current_date());
	ELSE 
		UPDATE VIEWS SET amount_views=amountViews+1 WHERE date_views=current_date() ;
	END IF;
END//


DELIMITER //
CREATE FUNCTION Estado_usuario(user_id BIGINT UNSIGNED)
	RETURNS int
    DETERMINISTIC
BEGIN
	DECLARE estado int;
	SELECT bit_status INTO estado FROM user 
    WHERE id_user=user_id;
    RETURN estado;
END//



DELIMITER &&
CREATE FUNCTION fn_Denuncia(id_user BIGINT UNSIGNED)
	RETURNS int
    DETERMINISTIC
BEGIN
	DECLARE NumeroDenuncias int;
	SELECT count(fk_id_user_complaining) INTO NumeroDenuncias  FROM complaint
     WHERE EXISTS (SELECT * FROM user
     WHERE id_user=fk_id_user_complaining
     GROUP BY id_user);
	RETURN NumeroDenuncias;
END &&




DELIMITER //
CREATE PROCEDURE listUsuarioDenuncia(id int)
BEGIN
SELECT COMPLAINT.id_COMPLAINT,complaint_category.var_name AS NombreCategoria , user.var_name AS NombreUsuario,USER.var_lastname AS SegundoNombre ,COMPLAINT.text_description AS Descripcion,
COMPLAINT.tim_date ,date_format(tim_date,'%d/%m/%Y') AS dateComplaint ,time_format(tim_date,'%H:%i') 
AS hourComplaint, user.bit_status FROM COMPLAINT INNER JOIN user ON 
 COMPLAINT.fk_id_user_complaining=user.id_user INNER JOIN complaint_category ON
 complaint_category.id_complaint_category=COMPLAINT.fk_id_complaint_category
 WHERE COMPLAINT.fk_id_user_complaining=id;
END//

-- call listUsuarioDenuncia(5)
SELECT * FROM user;
SELECT user.bit_status FROM user INNER JOIN COMPLAINT;
SELECT * FROM COMPLAINT;

-- call listUsuarioDenuncia()


DELIMITER //
CREATE PROCEDURE ListadoUsuarioNumDenu1()
BEGIN
SELECT fk_id_user,count(fk_id_user) As NumeroDenuncias FROM complaint
GROUP BY fk_id_user;
END//

-- call ListadoUsuarioNumDenu1();


-- Eliminar Denuncias
DROP PROCEDURE IF EXISTS eliminarDenuncia;
DELIMITER //
CREATE  PROCEDURE eliminarDenuncia(id int)
BEGIN
 DELETE FROM complaint where id_COMPLAINT=id; 
END//


DELIMITER //
CREATE PROCEDURE modificarEstado(id int)
BEGIN
UPDATE user SET bit_status=0 WHERE id_user=id; 
END//

-- CALL modificarEstado(6);
-- SELECT * FROM user;

DELIMITER //
CREATE PROCEDURE ListadoUsuarios()
BEGIN
SELECT id_user,var_name,var_lastname, fn_Denuncia(id_user) AS Denuncias1 FROM user AS U
WHERE  fn_Denuncia(id_user)>0 and Estado_usuario( U.id_user)=1 AND U.bit_rol=1;
END//

