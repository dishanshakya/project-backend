create TABLE Users(
user_id SERIAL PRIMARY KEY,
username VARCHAR(255),
password VARCHAR(255),
email VARCHAR(255) UNIQUE not null,
gender INT,
profile_pic_src VARCHAR(255)
);


create TABLE Category(
    category_id int primary key,
category_name VARCHAR(255) UNIQUE
);

create TABLE Orders(
order_id serial PRIMARY KEY,
order_type VARCHAR(255) NOT NULL,
date timestamp default current_timestamp,
user_id INT,
product_name VARCHAR(255) NOT NULL,
category INT,
price numeric(10, 2),
product_status VARCHAR(255),
description text,
location VARCHAR(255) NOT NULL,
contact VARCHAR(10),
img_src VARCHAR(255),
FOREIGN KEY (user_id) REFERENCES Users(user_id),
FOREIGN KEY (category) REFERENCES Category(category_id)
);

create TABLE Reservation(
seller_id INT,
order_id INT PRIMARY KEY,
reservation_date DATE NOT NULL,
buyer_id INT,
FOREIGN KEY (seller_id) REFERENCES Users(user_id),
FOREIGN KEY (buyer_id) REFERENCES Users(user_id)
);


create table comments (
    comment_id serial primary key,
    text text,
    user_id int,
    order_id int,
    replies boolean default false,
    date timestamp default current_timestamp,
    foreign key(user_id) references users(user_id),
    foreign key(order_id) references orders(order_id)
);

create table replies (
    reply_id serial primary key,
    text text,
    user_id int,
    comment_id int,
    date timestamp default current_timestamp,
    foreign key(user_id) references users(user_id),
    foreign key(comment_id) references comments(comment_id)
);

insert into category (category_id, category_name) values (8,'Books'),
(1,'Electronics'),
(2,'Hardware'),
(3,'Households'),
(4,'Mobile Phones'),
(5,'Stationery'),
(6,'Guides'),
(7,'Notes');
