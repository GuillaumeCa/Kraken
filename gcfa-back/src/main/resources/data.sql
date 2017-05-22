INSERT IGNORE INTO role (id, name) VALUES (1, "ROLE_APPRENTICE");
INSERT IGNORE INTO role (id, name) VALUES (2, "ROLE_TUTOR");
INSERT IGNORE INTO role (id, name) VALUES (3, "ROLE_CONSULTANT");
INSERT IGNORE INTO role (id, name) VALUES (4, "ROLE_SUPER_ADMIN");

INSERT IGNORE INTO user(id, email, first_name, 
	last_name, password, 
	sexe, role_id, active) 
	VALUES (1,"test@test.fr","testF",
	"testL","$2a$10$ON5hlLrN8jo6duJ5ihKTyOPA35W3Fu2y48jCBBDhEsXDPZebDWgre",
	"Male",2,1);
INSERT IGNORE INTO tutor(id,job,user_id)
	VALUES(1,"Chercheur",1);
	
INSERT IGNORE INTO user(id, email, first_name, 
	last_name, password, 
	sexe, role_id, active) 
	VALUES (2,"nicolas.simoes@isep.fr","Nicolas",
	"Simoes","$2a$10$ON5hlLrN8jo6duJ5ihKTyOPA35W3Fu2y48jCBBDhEsXDPZebDWgre",
	"Male",1,1);
INSERT IGNORE INTO user(id, email, first_name, 
	last_name, password, 
	sexe, role_id, active) 
	VALUES (3,"julien.voyat@isep.fr","Julien",
	"Voyat","$2a$10$ON5hlLrN8jo6duJ5ihKTyOPA35W3Fu2y48jCBBDhEsXDPZebDWgre",
	"Male",1,1);
	
INSERT IGNORE INTO company(id, name)
	VALUES (1,"company XXX");
INSERT IGNORE INTO company(id, name)
	VALUES (2,"company YYY");
	
INSERT IGNORE INTO company_site(id, address, city, code_postal, name, company_id)
	VALUES (1, "Adress Company Site XXX", "City Company Site XXX",11111,"Company site of company XXX",1);
INSERT IGNORE INTO company_site(id, address, city, code_postal, name, company_id)
	VALUES (2, "Adress Company Site YYY", "City Company Site YYY",22222,"Company site of company YYY",2);
	
INSERT IGNORE INTO apprentice(id, contract_type, promotion, company_site_id, tutor_id, user_id)
	VALUES(1, "THREE_YEARS", 2018, 1, 1, 2);
INSERT IGNORE INTO apprentice(id, contract_type, promotion, company_site_id, tutor_id, user_id)
	VALUES(2, "THREE_YEARS", 2018, 2, 1, 3);
	
INSERT IGNORE INTO document_type(id, contract, day, month, name, year) VALUES (1, "THREE_YEARS", 1, 1, "Journal 1", 1);
INSERT IGNORE INTO document_type(id, contract, day, month, name, year) VALUES (2, "THREE_YEARS", 1, 5, "Journal 2", 1);
INSERT IGNORE INTO document_type(id, contract, day, month, name, year) VALUES (3, "THREE_YEARS", 1, 9, "Journal 3", 1);
INSERT IGNORE INTO document_type(id, contract, day, month, name, year) VALUES (4, "THREE_YEARS", 1, 1, "Journal 4", 2);
INSERT IGNORE INTO document_type(id, contract, day, month, name, year) VALUES (5, "THREE_YEARS", 1, 5, "Journal 5", 2);
INSERT IGNORE INTO document_type(id, contract, day, month, name, year) VALUES (6, "THREE_YEARS", 1, 9, "Journal 6", 2);
INSERT IGNORE INTO document_type(id, contract, day, month, name, year) VALUES (7, "THREE_YEARS", 1, 1, "Journal 7", 3);
INSERT IGNORE INTO document_type(id, contract, day, month, name, year) VALUES (8, "THREE_YEARS", 1, 9, "Journal 8", 3);

INSERT IGNORE INTO document_type(id, contract, day, month, name, year) VALUES (9, "THREE_YEARS", 1, 1, "Rapport d'étape 1", 1);
INSERT IGNORE INTO document_type(id, contract, day, month, name, year) VALUES (10, "THREE_YEARS", 1, 5, "Rapport d'étape 2", 1);
INSERT IGNORE INTO document_type(id, contract, day, month, name, year) VALUES (11, "THREE_YEARS", 1, 9, "Rapport d'étape 3", 1);
INSERT IGNORE INTO document_type(id, contract, day, month, name, year) VALUES (12, "THREE_YEARS", 1, 1, "Rapport d'étape 4", 2);
INSERT IGNORE INTO document_type(id, contract, day, month, name, year) VALUES (13, "THREE_YEARS", 1, 5, "Rapport d'étape 5", 2);
INSERT IGNORE INTO document_type(id, contract, day, month, name, year) VALUES (14, "THREE_YEARS", 1, 9, "Rapport d'étape 6", 2);
INSERT IGNORE INTO document_type(id, contract, day, month, name, year) VALUES (15, "THREE_YEARS", 1, 1, "Rapport d'étape 7", 3);

INSERT IGNORE INTO document_type(id, contract, day, month, name, year) VALUES (16, "THREE_YEARS", 1, 10, "Synthese 1", 1);
INSERT IGNORE INTO document_type(id, contract, day, month, name, year) VALUES (17, "THREE_YEARS", 1, 10, "Synthese 2", 2);
INSERT IGNORE INTO document_type(id, contract, day, month, name, year) VALUES (18, "THREE_YEARS", 1, 9, "Rapport final", 3);

INSERT IGNORE INTO document_type(id, contract, day, month, name, year) VALUES (19,"THREE_YEARS", 1, 1,"Evaluation debut", 1);
INSERT IGNORE INTO document_type(id, contract, day, month, name, year) VALUES (20,"THREE_YEARS", 1, 10,"Evaluation fin A1", 1);
INSERT IGNORE INTO document_type(id, contract, day, month, name, year) VALUES (21,"THREE_YEARS", 1, 10,"Evaluation fin A2", 2);
INSERT IGNORE INTO document_type(id, contract, day, month, name, year) VALUES (22,"THREE_YEARS", 1, 9,"Evaluation fin A3", 3);


INSERT IGNORE INTO document_type(id, contract, day, month, name, year) VALUES (23, "TWO_YEARS", 1, 1, "Journal 1", 1);
INSERT IGNORE INTO document_type(id, contract, day, month, name, year) VALUES (24, "TWO_YEARS", 1, 5, "Journal 2", 1);
INSERT IGNORE INTO document_type(id, contract, day, month, name, year) VALUES (25, "TWO_YEARS", 1, 9, "Journal 3", 1);
INSERT IGNORE INTO document_type(id, contract, day, month, name, year) VALUES (26, "TWO_YEARS", 1, 1, "Journal 4", 2);
INSERT IGNORE INTO document_type(id, contract, day, month, name, year) VALUES (27, "TWO_YEARS", 1, 9, "Journal 5", 2);

INSERT IGNORE INTO document_type(id, contract, day, month, name, year) VALUES (28, "TWO_YEARS", 1, 1, "Rapport d'étape 1", 1);
INSERT IGNORE INTO document_type(id, contract, day, month, name, year) VALUES (29, "TWO_YEARS", 1, 5, "Rapport d'étape 2", 1);
INSERT IGNORE INTO document_type(id, contract, day, month, name, year) VALUES (30, "TWO_YEARS", 1, 9, "Rapport d'étape 3", 1);
INSERT IGNORE INTO document_type(id, contract, day, month, name, year) VALUES (31, "TWO_YEARS", 1, 1, "Rapport d'étape 4", 2);

INSERT IGNORE INTO document_type(id, contract, day, month, name, year) VALUES (32, "TWO_YEARS", 1, 10, "Synthese 1", 1);
INSERT IGNORE INTO document_type(id, contract, day, month, name, year) VALUES (33, "TWO_YEARS", 1, 9, "Rapport final", 2);

INSERT IGNORE INTO document_type(id, contract, day, month, name, year) VALUES (34,"TWO_YEARS", 1, 1,"Evaluation debut", 1);
INSERT IGNORE INTO document_type(id, contract, day, month, name, year) VALUES (35,"TWO_YEARS", 1, 10,"Evaluation fin A2", 1);
INSERT IGNORE INTO document_type(id, contract, day, month, name, year) VALUES (36,"TWO_YEARS", 1, 9,"Evaluation fin A3", 2);