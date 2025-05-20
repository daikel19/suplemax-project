
create database if not exists suplemax_db default character set utf8mb4 collate utf8mb4_unicode_ci;
use suplemax_db;

-- tabla de usuarios
create table if not exists usuarios (
  id int auto_increment primary key,
  nombre varchar(100) not null,
  email varchar(100) unique not null,
  password varchar(255) not null,
  telefono varchar(20),
  direccion text,
  rol enum('cliente', 'admin') default 'cliente',
  fecha_registro timestamp default current_timestamp
);
alter table usuarios change contraseña password varchar(255) not null;

-- tabla de categorias
create table if not exists categorias (
  id int auto_increment primary key,
  nombre varchar(100) not null,
  slug varchar(100) unique,
  descripcion text
);

-- tabla de productos
create table if not exists productos (
  id int auto_increment primary key,
  nombre varchar(150) not null,
  descripcion text,
  precio decimal(10,2) not null,
  imagen varchar(255),
  stock int default 0,
  id_categoria int,
  sabor varchar(100),
  tipo varchar(50),
  fecha_creacion timestamp default current_timestamp,
  foreign key (id_categoria) references categorias(id)
);
alter table productos
add column marca VARCHAR(100) after nombre;
select id, nombre from categorias;

insert into categorias (nombre) values
('Proteínas'),
('Creatina'),
('Vitaminas'),
('Preentrenos'),
('Aminoácidos'),
('Ganadores de peso'),
('Quemagrasas'),
('Otros');


insert into productos (nombre, marca, id_categoria, sabor, tipo, precio, stock)
values 
-- PROTEÍNAS (id_categoria = 1)
('Isolate Gourmet', 'Life Pro', 1, 'Choco monky', 'Whey Isolada', 32.99, 60),
('Whey Pure OnePiece', 'Big', 1, 'One piece', 'Whey Concentrada', 22.99, 90),


-- CREATINA (id_categoria = 2)
('Creatine Monohydrate', 'Quamtrax', 2, 'Neutra', 'Monohidrato', 21.50, 120),
('Creatina 100% Pure', 'Big', 2, 'Neutra', 'Monohidrato', 24.90, 80),
('Creatina Monohidratada', 'Life Pro', 2, 'Neutra', 'Monohidrato', 18.90, 150),


-- VITAMINAS (id_categoria = 3)
('Multivitamin Complex', 'Iogenix', 3, 'Neutra', 'Complejo', 15.99, 200),
('Vitaminas Diarias', 'HSN', 3, 'Neutra', 'Complejo', 13.99, 180),
('Vita+ Essentials', 'Big', 3, 'Neutra', 'Complejo', 17.90, 120),
('Daily Vitamins', 'Optimum Nutrition', 3, 'Neutra', 'Complejo', 16.75, 110),
('MultiVit', 'Amix', 3, 'Neutra', 'Complejo', 14.80, 100),

-- PREENTRENOS (id_categoria = 4)
('Napalm Pre-Contest', 'FA Nutrition', 4, 'Limón', 'Pre-entreno', 26.50, 90),
('Explosive Pump', 'Life Pro', 4, 'Cola', 'Pre-entreno', 28.90, 70),
('NO-Xplode', 'BSN', 4, 'Frambuesa', 'Pre-entreno', 32.00, 80),
('Boogieman', 'Trec Nutrition', 4, 'Manzana Verde', 'Pre-entreno', 25.99, 60),
('PreWorkout 2.0', 'Big', 4, 'Naranja', 'Pre-entreno', 27.99, 100),

-- AMINOÁCIDOS (id_categoria = 5)
('BCAA 8:1:1', 'HSN', 5, 'Sandía', 'Aminoácidos', 19.95, 90),
('Essential Amino Energy', 'Optimum Nutrition', 5, 'Uva', 'Aminoácidos', 21.99, 100),
('AminoComplete', 'Now Foods', 5, 'Neutra', 'Aminoácidos', 18.50, 110),
('BCAA Instant', 'Life Pro', 5, 'Fresa', 'Aminoácidos', 23.75, 95),
('Aminoacids Powder', 'Amix', 5, 'Neutra', 'Aminoácidos', 20.99, 70),

-- GANADORES DE PESO (id_categoria = 6)
('Serious Mass', 'Optimum Nutrition', 6, 'Chocolate', 'Gainer', 34.90, 60),
('Mass Gainer Elite', 'Big', 6, 'Neutra', 'Gainer', 31.50, 50),
('Super Mega Gainer', 'Amix', 6, 'Vainilla', 'Gainer', 33.00, 75),
('Mass Professional', 'Quamtrax', 6, 'Cookies', 'Gainer', 30.90, 55),
('Gainer Pro', 'Iogenix', 6, 'Fresa', 'Gainer', 29.50, 65),

-- QUEMAGRASAS (id_categoria = 7)
('Lipo 6 Black', 'Nutrex', 7, 'Neutra', 'Termogénico', 27.90, 90),
('Burner Thermo', 'HSN', 7, 'Neutra', 'Termogénico', 22.80, 100),
('Fat Burner Extreme', 'Life Pro', 7, 'Neutra', 'Termogénico', 25.99, 85),
('ThermoPro', 'Quamtrax', 7, 'Neutra', 'Termogénico', 23.50, 95),
('Green Coffee Burner', 'Now Foods', 7, 'Neutra', 'Termogénico', 19.90, 110),

-- OTROS (id_categoria = 8)
('CLA 1000mg', 'Amix', 8, 'Sin sabor', 'Otros', 15.99, 150),
('Omega 3', 'Now Foods', 8, 'Sin sabor', 'Otros', 17.90, 130),
('ZMA Advanced', 'Life Pro', 8, 'Sin sabor', 'Otros', 13.99, 140),
('Joint+ Colágeno', 'HSN', 8, 'Sin sabor', 'Otros', 18.49, 120),
('Melatonina 1mg', 'Big', 8, 'Sin sabor', 'Otros', 10.99, 160);

-- carrito
create table if not exists carrito (
  id int auto_increment primary key,
  id_usuario int,
  id_producto int,
  cantidad int default 1,
  fecha_agregado timestamp default current_timestamp,
  foreign key (id_usuario) references usuarios(id),
  foreign key (id_producto) references productos(id)
);

-- pedidos
create table if not exists pedidos (
  id int auto_increment primary key,
  id_usuario int not null,
  total decimal(10,2) not null,
  estado enum('pendiente', 'pagado', 'enviado', 'cancelado') default 'pendiente',
  fecha timestamp default current_timestamp,
  foreign key (id_usuario) references usuarios(id)
);

-- detalles de cada producto en un pedido
create table if not exists pedido_detalles (
  id int auto_increment primary key,
  id_pedido int,
  id_producto int,
  cantidad int not null,
  precio_unitario decimal(10,2) not null,
  foreign key (id_pedido) references pedidos(id),
  foreign key (id_producto) references productos(id)
);
