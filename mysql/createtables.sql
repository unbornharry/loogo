CREATE TABLE IF NOT EXISTS `loogo`.`building` (
	`buildingid` INT NOT NULL AUTO_INCREMENT,
	`buildingname` VARCHAR(45) NULL,
	`address1` VARCHAR(100) NULL,
	`address2` VARCHAR(100) NULL,
	`city` VARCHAR(45) NULL,
	`state` VARCHAR(45) NULL,
	`zip` INT NULL,
	`createdtime` DATETIME NULL,
	`updatedtime` DATETIME NULL,
	PRIMARY KEY (`buildingid`),
	UNIQUE INDEX `idbuilding_UNIQUE` (`buildingid` ASC),
	UNIQUE INDEX `name_UNIQUE` (`buildingname` ASC));  
  
CREATE TABLE IF NOT EXISTS `loogo`.`floor` (
	`floorid` INT NOT NULL AUTO_INCREMENT,
	`buildingid` INT NOT NULL,
	`floornumber` VARCHAR(5) NOT NULL,
	`floorname` VARCHAR(45) NULL,
	`createdtime` DATETIME NULL,
	`updatedtime` DATETIME NULL,
	PRIMARY KEY (`floornumber`, `buildingid`),
	UNIQUE INDEX `floorid_UNIQUE` (`floorid` ASC),
	INDEX `buildingid_idx` (`buildingid` ASC),
	CONSTRAINT `buildingid`
	FOREIGN KEY (`buildingid`)
	REFERENCES `loogo`.`building` (`buildingid`)
	ON DELETE CASCADE
	ON UPDATE CASCADE);

CREATE TABLE IF NOT EXISTS `loogo`.`restroom` ( 
	`restroomid`      INT NOT NULL auto_increment, 
	`buildingid`      INT NOT NULL, 
	`floorid`         INT NOT NULL, 
	`restroomname`    VARCHAR(45) NOT NULL, 
	`gender`          VARCHAR(20) NOT NULL, 
	`numberofstalls`  INT NULL, 
	`numberofurinals` INT NULL, 
	`status`          VARCHAR(45) NULL,
	`location` 		VARCHAR(45) NULL,
	`createdtime`     DATETIME NULL,						  
	`updatedtime`     DATETIME NULL,
	PRIMARY KEY (`floorid`, `restroomname`, `gender`), 
	UNIQUE INDEX `restroomid_unique` (`restroomid` asc), 
	INDEX `floorid_idx` (`floorid` ASC), 
	CONSTRAINT `restroom_buildingid` FOREIGN KEY (`buildingid`) REFERENCES `loogo`.`building` (`buildingid`) ON
	 DELETE RESTRICT 
	 ON 
	 UPDATE CASCADE, 
			CONSTRAINT `restroom_floorid` FOREIGN KEY (`floorid`) REFERENCES `loogo`.`floor` (`floorid`)
	 ON 
	 DELETE RESTRICT 
	 ON 
	 UPDATE CASCADE 
	 );
			 
CREATE TABLE IF NOT EXISTS `loogo`.`meetingroom` (
	`meetingroomid` INT NOT NULL AUTO_INCREMENT,
	`buildingid` INT NOT NULL,
	`floorid` INT NOT NULL,
	`roomname` VARCHAR(45) NOT NULL,
	`occupancy` INT NULL,
	`location` VARCHAR(45) NULL,
	`createdtime` DATETIME NULL,
	`updatedtime` DATETIME NULL,
	PRIMARY KEY (`buildingid`, `floorid`, `roomname`),
	UNIQUE INDEX `meetingroomid_UNIQUE` (`meetingroomid` ASC),
	INDEX `meeting_floorid_idx` (`floorid` ASC),
	CONSTRAINT `meeting_buildingid`
	FOREIGN KEY (`buildingid`)
	REFERENCES `loogo`.`building` (`buildingid`)
	ON DELETE NO ACTION
	ON UPDATE NO ACTION,
	CONSTRAINT `meeting_floorid`
	FOREIGN KEY (`floorid`)
	REFERENCES `loogo`.`floor` (`floorid`)
	ON DELETE RESTRICT
	ON UPDATE CASCADE);