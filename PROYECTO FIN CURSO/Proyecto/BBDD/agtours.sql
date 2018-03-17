-- MySQL Script generated by MySQL Workbench
-- Thu Mar 15 17:45:09 2018
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`Ciudades`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Ciudades` (
  `idCiudades` INT NOT NULL AUTO_INCREMENT,
  `Paises_Codigo` VARCHAR(10) NULL,
  `Ciudad` VARCHAR(250) NULL,
  PRIMARY KEY (`idCiudades`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`clientes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`clientes` (
  `idcliente` INT NOT NULL,
  `nom_cli` VARCHAR(45) NULL,
  `apell__cli` VARCHAR(70) NULL,
  `direc_cli` VARCHAR(100) NULL,
  `tel_cli` VARCHAR(45) NULL,
  `email_cli` VARCHAR(150) NULL,
  ` usuario` VARCHAR(45) NULL,
  `password` VARCHAR(45) NULL,
  `rol` INT NOT NULL,
  `id_ciudad` INT NOT NULL,
  `cp_cliente` INT NULL,
  PRIMARY KEY (`idcliente`, `id_ciudad`),
  INDEX `fk_id_ciduad_idx` (`id_ciudad` ASC),
  CONSTRAINT `fk_id_ciduad`
    FOREIGN KEY (`id_ciudad`)
    REFERENCES `mydb`.`Ciudades` (`idCiudades`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Paises`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Paises` (
  `Codigo` VARCHAR(10) NOT NULL,
  `Pais` VARCHAR(250) NULL,
  PRIMARY KEY (`Codigo`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`ventas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`ventas` (
  `id_venta` INT NOT NULL AUTO_INCREMENT,
  `fecha_venta` TIMESTAMP NULL,
  `total_venta` INT NULL,
  `id_cliente_venta` INT NOT NULL,
  PRIMARY KEY (`id_venta`),
  INDEX `fk_id_cliente_idx` (`id_cliente_venta` ASC),
  CONSTRAINT `fk_id_cliente`
    FOREIGN KEY (`id_cliente_venta`)
    REFERENCES `mydb`.`clientes` (`idcliente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`linea_venta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`linea_venta` (
  `id_linea_venta` INT NOT NULL AUTO_INCREMENT,
  `id_venta` INT NULL,
  `precio_venta` DOUBLE NULL,
  PRIMARY KEY (`id_linea_venta`),
  INDEX `fk_id_venta_idx` (`id_venta` ASC),
  CONSTRAINT `fk_id_venta`
    FOREIGN KEY (`id_venta`)
    REFERENCES `mydb`.`ventas` (`id_venta`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`productos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`productos` (
  `id_producto` INT NOT NULL AUTO_INCREMENT,
  `adultos` INT NULL,
  `niños` INT NULL,
  `animales` TINYINT NULL,
  `id_tipo_producto` INT NULL,
  `id_linea_venta` INT NULL,
  PRIMARY KEY (`id_producto`),
  INDEX `fk_id_venta_idx` (`id_linea_venta` ASC),
  CONSTRAINT `fk_id_linea_venta`
    FOREIGN KEY (`id_linea_venta`)
    REFERENCES `mydb`.`linea_venta` (`id_linea_venta`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`extras_hotel`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`extras_hotel` (
  `id_extras_hotel` INT NOT NULL,
  `nom_extra` VARCHAR(150) NULL,
  `descrip_extra` VARCHAR(250) NULL,
  `id_hotel_extra` INT NULL,
  `wifi` TINYINT NULL,
  `animales` TINYINT NULL,
  `desayuno` TINYINT NULL,
  `piscina` TINYINT NULL,
  `golf` TINYINT NULL,
  `shopping` TINYINT NULL,
  `eventos` TINYINT NULL,
  `bodas` TINYINT NULL,
  `comida` TINYINT NULL,
  `cena` TINYINT NULL,
  PRIMARY KEY (`id_extras_hotel`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`categorias`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`categorias` (
  `id_categorias` INT NOT NULL AUTO_INCREMENT,
  `nom_categorias` VARCHAR(150) NULL,
  `descrip_categorias` VARCHAR(250) NULL,
  `cat_padre` INT NULL,
  PRIMARY KEY (`id_categorias`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`comentarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`comentarios` (
  `id_comentarios` INT NOT NULL,
  `descrip_comentario` VARCHAR(250) NULL,
  `valoracion` INT NULL,
  PRIMARY KEY (`id_comentarios`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`hoteles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`hoteles` (
  `id_hotel` INT NOT NULL,
  `nom_hotel` VARCHAR(250) NULL,
  `descrip_hotel` VARCHAR(250) NULL,
  `extras_hotel` INT NOT NULL,
  `cat_hotel` INT NOT NULL,
  `id_comentario_hotel` INT NOT NULL,
  `id_ciudad_hotel` INT NOT NULL,
  PRIMARY KEY (`id_hotel`),
  INDEX `fk_extras_hotel_idx` (`extras_hotel` ASC),
  INDEX `fk_cat_hotel_idx` (`cat_hotel` ASC),
  INDEX `fk_id_comentario_idx` (`id_comentario_hotel` ASC),
  INDEX `fk_id_ciudad_idx` (`id_ciudad_hotel` ASC),
  CONSTRAINT `fk_extras_hotel`
    FOREIGN KEY (`extras_hotel`)
    REFERENCES `mydb`.`extras_hotel` (`id_extras_hotel`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_cat_hotel`
    FOREIGN KEY (`cat_hotel`)
    REFERENCES `mydb`.`categorias` (`id_categorias`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_id_comentario`
    FOREIGN KEY (`id_comentario_hotel`)
    REFERENCES `mydb`.`comentarios` (`id_comentarios`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_id_ciudades`
    FOREIGN KEY (`id_ciudad_hotel`)
    REFERENCES `mydb`.`Ciudades` (`idCiudades`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`dias`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`dias` (
  `id_dia` INT NOT NULL,
  `nom_dia` VARCHAR(250) NULL,
  `id_descrip_dia` INT NULL,
  PRIMARY KEY (`id_dia`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`tours`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`tours` (
  `id_producto` INT NOT NULL AUTO_INCREMENT,
  `nom_tour` VARCHAR(150) NULL,
  `descrip_tour` VARCHAR(250) NULL,
  `fech_inicio` DATETIME NULL,
  `fech_fin` DATETIME NULL,
  `dias_tour` INT NULL,
  `mapa` VARCHAR(250) NULL,
  `precio` DOUBLE NULL,
  `descuento_tour` DOUBLE NULL,
  `cat_tour` INT NULL,
  `id_comentario_tour` INT NULL,
  `id_ciudad` INT NULL,
  `id_tipo_producto` INT NULL,
  PRIMARY KEY (`id_producto`),
  INDEX `fk_cat_tour_idx` (`cat_tour` ASC),
  INDEX `fk_id_comentario_idx` (`id_comentario_tour` ASC),
  INDEX `fk_id_dias_idx` (`dias_tour` ASC),
  INDEX `fk_id_ciudad_idx` (`id_ciudad` ASC),
  CONSTRAINT `fk_cat_tour`
    FOREIGN KEY (`cat_tour`)
    REFERENCES `mydb`.`categorias` (`id_categorias`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_id_comentario_tour`
    FOREIGN KEY (`id_comentario_tour`)
    REFERENCES `mydb`.`comentarios` (`id_comentarios`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_id_dias_tour`
    FOREIGN KEY (`dias_tour`)
    REFERENCES `mydb`.`dias` (`id_dia`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_id_ciudad_tour`
    FOREIGN KEY (`id_ciudad`)
    REFERENCES `mydb`.`Ciudades` (`idCiudades`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_id_producto_tour`
    FOREIGN KEY (`id_producto`)
    REFERENCES `mydb`.`productos` (`id_producto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`imagenes_productos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`imagenes_productos` (
  `id_img_pro` INT NOT NULL AUTO_INCREMENT,
  `url_img` VARCHAR(250) NULL,
  `id_producto` INT NULL,
  PRIMARY KEY (`id_img_pro`),
  INDEX `fk_id_producto_idx` (`id_producto` ASC),
  CONSTRAINT `fk_id_hotel`
    FOREIGN KEY (`id_producto`)
    REFERENCES `mydb`.`hoteles` (`id_hotel`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_id_tour`
    FOREIGN KEY (`id_producto`)
    REFERENCES `mydb`.`tours` (`id_producto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`tipo_habitaciones`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`tipo_habitaciones` (
  `id_producto_habitacion` INT NOT NULL,
  `nom_tipo_habitaciones` VARCHAR(100) NULL,
  `precio_habitacion` DOUBLE NULL,
  `hotel_id` INT NULL,
  `descuento_habitacion` VARCHAR(45) NULL,
  PRIMARY KEY (`id_producto_habitacion`),
  INDEX `fk_id_hotel_idx` (`hotel_id` ASC),
  CONSTRAINT `fk_id_hotel_habita`
    FOREIGN KEY (`hotel_id`)
    REFERENCES `mydb`.`hoteles` (`id_hotel`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_id_producto_habita`
    FOREIGN KEY (`id_producto_habitacion`)
    REFERENCES `mydb`.`productos` (`id_producto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`proveedores`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`proveedores` (
  `id_proveedor` INT NOT NULL,
  `nom_proveedor` VARCHAR(150) NULL,
  `proveedorescol` VARCHAR(45) NULL,
  `rol_proveedor` INT NULL,
  `cuenta_proveedor` INT NULL,
  `direcc_proveedor` VARCHAR(250) NULL,
  `tel_proveedor` INT NULL,
  `email_proveedor` VARCHAR(250) NULL,
  PRIMARY KEY (`id_proveedor`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`dias_tours`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`dias_tours` (
  `id_dia` INT NOT NULL,
  `id_tours` INT NOT NULL,
  `descripcion_dia_tour` VARCHAR(255) NULL,
  PRIMARY KEY (`id_dia`, `id_tours`),
  INDEX `fk_id_tour_idx` (`id_tours` ASC),
  CONSTRAINT `fk_id_dia_tour_dias`
    FOREIGN KEY (`id_dia`)
    REFERENCES `mydb`.`dias` (`id_dia`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_id_tour_dias`
    FOREIGN KEY (`id_tours`)
    REFERENCES `mydb`.`tours` (`id_producto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;