CREATE TABLE IF NOT EXISTS `loogo`.`building` (
	`buildingid` INT NOT NULL AUTO_INCREMENT,
	`buildingname` VARCHAR(45) NULL,
	`address1` VARCHAR(100) NULL,
	`address2` VARCHAR(100) NULL,
	`city` VARCHAR(45) NULL,
	`state` VARCHAR(45) NULL,
	`zip` INT NULL,
	`createdtime` DATETIME DEFAULT CURRENT_TIMESTAMP,
	`updatedtime` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (`buildingid`),
	UNIQUE INDEX `idbuilding_UNIQUE` (`buildingid` ASC),
	UNIQUE INDEX `name_UNIQUE` (`buildingname` ASC));  
  
CREATE TABLE IF NOT EXISTS `loogo`.`floor` (
	`floorid` INT NOT NULL AUTO_INCREMENT,
	`buildingid` INT NOT NULL,
	`floornumber` INT NOT NULL,
	`floorname` VARCHAR(45) NULL,
	`createdtime` DATETIME DEFAULT CURRENT_TIMESTAMP,
	`updatedtime` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
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
	`restroomdisplayname`    VARCHAR(45) NOT NULL,
	`gender`          VARCHAR(20) NOT NULL, 
	`numberofstalls`  INT NULL, 
	`numberofurinals` INT NULL,
	`deviceserialnumber` VARCHAR(45) NULL,
	`status`          VARCHAR(45) NULL,
	`location` 		VARCHAR(45) NULL,
	`createdtime`     DATETIME DEFAULT CURRENT_TIMESTAMP,
	`updatedtime`     DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (`floorid`, `restroomname`, `gender`, `buildingid`),
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
	`meetingroomname` VARCHAR(45) NOT NULL,
	`meetingroomdisplayname` VARCHAR(45) NOT NULL,
	`deviceid` VARCHAR(45) NULL,
	`occupantcount` INT NULL DEFAULT 0,
	`occupancy` INT DEFAULT 0,
	`location` VARCHAR(45) NULL,
	`reserved` VARCHAR(10) NULL DEFAULT 'unreserved',
	`createdtime` DATETIME DEFAULT CURRENT_TIMESTAMP,
	`updatedtime` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (`buildingid`, `floorid`, `meetingroomname`),
	UNIQUE INDEX `meetingroomid_UNIQUE` (`meetingroomid` ASC),
	UNIQUE INDEX `deviceid_UNIQUE` (`deviceid` ASC),
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
