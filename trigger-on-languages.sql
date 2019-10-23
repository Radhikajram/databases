delimiter $$
CREATE TRIGGER language_trigger
    BEFORE INSERT 
        ON countrylanguage
            FOR EACH ROW

            BEGIN 
                DECLARE message VARCHAR(100);
                DECLARE language_count INT;
                SET language_count= (select count(language) from countrylanguage where countrycode=new.countrycode);
                IF language_count >=10
                THEN 
                    set message= 'Adding more than 10 language for a country';
                    SET lc_messages=message; SIGNAL SQLSTATE '45001';
                END IF;
            END $$



delimiter ;