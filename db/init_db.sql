
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE product_category AS ENUM ('robes', 'chaussures', 'accessoires', 'hauts', 'bas', 'sacs', 'vestes', 'autres');
CREATE TYPE product_gender AS ENUM ('femme', 'homme', 'mixte');

CREATE TABLE Products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    inventory INT NOT NULL,
    category product_category DEFAULT 'autres',
    gender product_gender DEFAULT 'mixte'
);


INSERT INTO Products (name, price, inventory) VALUES 
    ('T-shirt Blanc', 19.99, 100, 'hauts', 'mixte'),
    ('Jean Slim Noir', 49.99, 75, 'bas', 'mixte'),
    ('Chaussures de Sport', 89.99, 50, 'chaussures', "mixte"),
    ('Veste en Cuir', 199.99, 25, 'vestes', 'mixte'),
    ('Robe d''Été', 29.99, 60, 'robes', 'femme'),
    ('Cravate en Soie', 24.99, 40, 'accessoires', 'homme'),
    ('Sac à Main', 59.99, 30, 'sac', 'femme'),
    ('Chapeau Panama', 34.99, 20, 'accessoires', 'mixte'),
    ('Écharpe en Laine', 29.99, 45, 'accessoires', 'mixte'),
    ('Ceinture en Cuir', 39.99, 70, 'accessoires', 'mixte'),
    ('Montre Classique', 149.99, 15, 'accessoires', 'mixte'),
    ('Bottes en Cuir', 99.99, 40, 'chaussures', 'femme'),
    ('Lunettes de Soleil', 79.99, 50, 'accessoires', 'mixte'),
    ('Chemise à Carreaux', 44.99, 55, 'hauts', 'homme'),
    ('Pull-over Gris', 64.99, 35, 'hauts', 'mixte'),
    ('Short en Jean', 39.99, 60, 'bas', 'homme'),
    ('Sandales d''Été', 49.99, 40, 'chaussures', "mixte"),
    ('Bijoux Fantaisie', 14.99, 85, 'accessoires', 'mitxe'),
    ('Pantalon Chino', 54.99, 50, 'bas', 'mixte'),
    ('Blouse Florale', 39.99, 40, 'hauts', 'femme');


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
    details TEXT DEFAULT NULL,
    cart_total_min INT,
    name VARCHAR(25) NOT NULL,
    pourcentage INT NOT NULL,
    start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    end_date TIMESTAMP DEFAULT NULL 
);

CREATE TYPE message_subject AS ENUM ('livraison', 'anulation', 'nos produits', 'ma commande', 'autre');

CREATE TABLE Messages (
    id UUID DEFAULT Uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    message_subject message_subject DEFAULT 'autre',
    details TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    order_id UUID,
    user_email VARCHAR(35) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES Orders(id),
    FOREIGN KEY (user_email) REFERENCES Users(email)
);