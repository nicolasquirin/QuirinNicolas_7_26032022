// Structure format user base de données SQL

/*
AUTHENTIFICATION_USERS

1	id     ///////// Primaire	//////  int(11)	//////////	Non	Aucun(e)	////////	AUTO_INCREMENT

2	email   //////  varchar(200)//////	utf8mb4_general_ci				
	
3	password  ////	varchar(150) /////	utf8mb4_general_ci			
	
4	timestamp Primaire	timestamp /////	Non	current_timestamp()	

PROFIL_USERS

1	id_profil_users Primaire ///////	int(10)	///////	UNSIGNED	Non	Aucun(e)		AUTO_INCREMENT	

2	profil_user_userid Index  ///////	int(11)	///////	UNSIGNED	Non	Aucun(e)				

3	profil_nom	varchar(100) ////	utf8mb4_general_ci					

4	profil_prenom	varchar(100) //	utf8mb4_general_ci					

5	profil_photo	varchar(100) ////utf8mb4_general_ci	

*/
