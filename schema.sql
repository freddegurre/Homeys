CREATE DATABASE homeys_db; 


-- Create owners
--INSERT INTO Owners (email, user_name, pass, createdAt, updatedAt)
--VALUES ("fredrik@gurra.com", "Fredde", "123456", current_time(), current_time());  

--INSERT INTO Owners (email, user_name, pass, createdAt, updatedAt)
--VALUES ("Gurra@gurra.com", "test", "123456", current_time(), current_time());

--INSERT INTO Owners (email, user_name, pass, createdAt, updatedAt)
--VALUES ("Hellog@udsdra.com", "Diego", "123456", current_time(), current_time());

--insert into properties (propName, streetAddress, zipCode, city, state, createdAt, updatedAt, ownerID)
--values  ("Peach House", "105 Clarington Ave", "95614", "Davis", "CA", current_time(), current_time(), 2);


insert into Providers (name, pass, zipCpde, dailyRate, createdAt, updatedAt)
values ('Burt Reynolds', 1234567, 94545, 50, current_time(), current_time())