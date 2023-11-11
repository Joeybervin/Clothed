
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE product_category AS ENUM ('robes', 'chaussures', 'accessoires', 'hauts', 'bas', 'sacs', 'vestes', 'chemises', 'null');
CREATE TYPE product_gender AS ENUM ('femme', 'homme', 'mixt');

CREATE TABLE Products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    inventory INT NOT NULL,
    category product_category DEFAULT 'null',
    gender product_gender DEFAULT 'mixt'
);


INSERT INTO Products (name, price, inventory) VALUES 
    ('T-shirt Blanc', 19.99, 100),
    ('Jean Slim Noir', 49.99, 75),
    ('Chaussures de Sport', 89.99, 50),
    ('Veste en Cuir', 199.99, 25),
    ('Robe d''Été', 29.99, 60),
    ('Cravate en Soie', 24.99, 40),
    ('Sac à Main', 59.99, 30),
    ('Chapeau Panama', 34.99, 20),
    ('Écharpe en Laine', 29.99, 45),
    ('Ceinture en Cuir', 39.99, 70),
    ('Montre Classique', 149.99, 15),
    ('Bottes en Cuir', 99.99, 40),
    ('Lunettes de Soleil', 79.99, 50),
    ('Chemise à Carreaux', 44.99, 55),
    ('Pull-over Gris', 64.99, 35),
    ('Short en Jean', 39.99, 60),
    ('Sandales d''Été', 49.99, 40),
    ('Bijoux Fantaisie', 14.99, 85),
    ('Pantalon Chino', 54.99, 50),
    ('Blouse Florale', 39.99, 40);


CREATE TYPE list_of_role AS ENUM ('admin_plus', 'admin', 'customer');

CREATE TABLE Users (
    id UUID DEFAULT Uuid_generate_v4() PRIMARY KEY,
    token UUID DEFAULT Uuid_generate_v4(),
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20),
    date_of_birth DATE,
    email VARCHAR(40) UNIQUE NOT NULL,
    password VARCHAR(150) NOT NULL,
    adress JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_role list_of_role DEFAULT 'customer',
    payment_info JSONB DEFAULT '{}'
);

CREATE TABLE Cart (
    id UUID DEFAULT Uuid_generate_v4() PRIMARY KEY,
    token UUID DEFAULT Uuid_generate_v4(),
    items TEXT[],
    user_id UUID UNIQUE,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TYPE order_status AS ENUM('payé', 'en cours de préparation', 'expédié', 'en cours de livraison', 'livré', 'annulé', 'rupture de stock', 'non payé' 'en cours de traitement', 'remboursé');

CREATE TABLE Orders (
    id UUID DEFAULT Uuid_generate_v4() PRIMARY KEY,
    items TEXT[] NOT NULL,
    user_id UUID NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    payment_info JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    delivery_date DATE,
    order_status order_status DEFAULT "en cours de traitement",
    discount_coupons_infos UUID DEFAULT NULL,
    processing_started_at TIMESTAMP,
    error TEXT,
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (discount_coupons_infos) REFERENCES Coupons(id)
);

CREATE UNIQUE INDEX Idx_rders_waiting_list ON Orders (processing_started_at, created_at DESC)
INCLUDE (id, created_at)
WHERE (processing_started_at IS NULL);

CREATE TABLE Coupons (
    id UUID DEFAULT Uuid_generate_v4() PRIMARY KEY,
    token UUID DEFAULT Uuid_generate_v4(),
    details TEXT,
    cart_total_min INT,
    quantity INT,
    name VARCHAR(25) NOT NULL,
    pourcentage INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL
);

CREATE TYPE message_subject AS ENUM ('livraison', 'anulation', 'nos produits', 'ma commande', 'autre');

CREATE TABLE Messages (
    id UUID DEFAULT Uuid_generate_v4() PRIMARY KEY,
    token UUID DEFAULT Uuid_generate_v4(),
    title VARCHAR(50) NOT NULL,
    message_subject message_subject DEFAULT 'autre',
    details TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    order_id UUID,
    user_email VARCHAR(35) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES Orders(id)
);