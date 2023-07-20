CREATE TABLE system_logs(
id_system_log SERIAL PRIMARY KEY COMMENT "Id bitacora del sistema",
action VARCHAR(200) NOT NULL COMMENT "accion",
date DATETIME NOT NULL COMMENT "Fecha",
fk_id_log_category INT COMMENT "Hace referencia al id de categoria bitacora", FOREIGN KEY (fk_id_log_category) REFERENCES log_category(id_log_category),
fk_id_user BIGINT UNSIGNED NOT NULL COMMENT "Hace referencia al usuario", FOREIGN KEY (fk_id_user) REFERENCES user(id_user)
);

CREATE TABLE log_category(
id_log_category INT PRIMARY KEY COMMENT "Id categoria bitacora",
category_name VARCHAR (200) NOT NULL COMMENT "Nombre categoria"
);

SELECT * FROM system_logs;
