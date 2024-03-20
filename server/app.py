from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_migrate import Migrate
from dotenv import load_dotenv
import os
from datetime import datetime


load_dotenv ('.flaskenv')

app= Flask(__name__)

#configuration for SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('SQLALCHEMY_DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']= False

#initialize SQLAlchemy 
db= SQLAlchemy(app)

#Initialize CORS 
CORS(app)
#Initialize Migrate 
migrate = Migrate(app,db)

#Define models 
class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    role = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False, unique=True)
    password = db.Column(db.String, nullable=False)

    # Define one-to-one relationship with Profile
    profile = db.relationship('Profile', backref='user', uselist=False)

    # Define one-to-many relationship with Apartment
    apartments = db.relationship('Apartment', backref='landlord', lazy=True)

    # Define one-to-many relationship with transactions as payee
    transactions_as_payee = db.relationship('Transaction', backref='payee', foreign_keys='Transaction.payee_id')

    # Define one-to-many relationship with transactions as payer
    transactions_as_payer = db.relationship('Transaction', backref='payer', foreign_keys='Transaction.payer_id')

    # Define one-to-many relationship with reviews
    reviews = db.relationship('Review', backref='user', lazy=True)

    # Define relationship to Billing (apartment owner)
    apartment_owner_billings = db.relationship('Billing', foreign_keys='Billing.apartment_owner_id', backref='apartment_owner')
    
    # Define relationship to Billing (resident)
    resident_billings = db.relationship('Billing', foreign_keys='Billing.resident_id', backref='resident')

    # Define relationship to Notification (sender)
    sent_notifications = db.relationship('Notification', foreign_keys='Notification.sender_id', backref='sender')

    # Define relationship to Notification (recipient)
    received_notifications = db.relationship('Notification', foreign_keys='Notification.recipient_id', backref='recipient')

    # Define one-to-many relationship with Document
    documents = db.relationship('Document', backref='user', lazy=True)

class Profile(db.Model):
    __tablename__ = 'profile'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False, unique=True)
    firstname = db.Column(db.String, nullable=False)
    middlename = db.Column(db.String, nullable=False)
    surname = db.Column(db.String, nullable=False)
    contact = db.Column(db.String, nullable=False, unique=True)
    address = db.Column(db.String, nullable=False)
    passport_url = db.Column(db.String, nullable=False)
    identification_card_url = db.Column(db.String, nullable=False)

class Category(db.Model):
    __tablename__ = 'category'

    id = db.Column(db.Integer, primary_key=True)
    category_name = db.Column(db.String, unique=True)

    # Relationship between Category and Apartment
    apartments = db.relationship('Apartment', backref='category', lazy=True)

class Apartment(db.Model):
    __tablename__ = 'apartment'

    id = db.Column(db.Integer, primary_key=True)
    apartment_name = db.Column(db.String, nullable=False, unique=True)
    landlord_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'), nullable=False)
    description = db.Column(db.String, nullable=False)
    location = db.Column(db.String, nullable=False)
    address = db.Column(db.String, nullable=False)
    amenities = db.Column(db.String, nullable=False)
    lease_agreement = db.Column(db.String, nullable=False)  
    image_url = db.Column(db.String, nullable=False)  
    status = db.Column(db.String, nullable=False)

    

    # Define the relationship to Booking 
    bookings = db.relationship('Booking', backref='apartment', lazy=True)

     # Define one-to-many relationship with transactions
    transactions = db.relationship('Transaction', backref='apartment')

    
    # Define one-to-many relationship with Document
    documents = db.relationship('Document', backref='apartment', lazy=True)

class Booking(db.Model):
    __tablename__ = 'booking'

    id = db.Column(db.Integer, primary_key=True)
    tenant_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    apartment_id = db.Column(db.Integer, db.ForeignKey('apartment.id'), nullable=False)
    description = db.Column(db.String, nullable=False)
    payment = db.Column(db.Integer, nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    # Define relationship to User (tenant)
    tenant = db.relationship('User', backref='bookings')

class Transaction(db.Model): 
    __tablename__ = 'transaction'

    id = db.Column(db.Integer, primary_key=True)
    payee_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    payer_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    apartment_id = db.Column(db.Integer, db.ForeignKey('apartment.id'), nullable=False)
    purpose = db.Column(db.String, nullable=False)
    amount = db.Column(db.Integer, nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

class Review(db.Model):
    __tablename__ = 'review'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    rating = db.Column(db.Integer)
    comment = db.Column(db.String, nullable=True)

class Billing(db.Model): 
    __tablename__ = 'billing'

    id = db.Column(db.Integer, primary_key=True)
    apartment_id = db.Column(db.Integer, db.ForeignKey('apartment.id'), nullable=False)
    apartment_owner_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    resident_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    amenity = db.Column(db.String, nullable=False)
    amount = db.Column(db.Integer, nullable=False)
    status = db.Column(db.String, nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    # Define relationships to Apartment and User
    apartment = db.relationship('Apartment', backref='billings')

class Notification(db.Model):
    __tablename__ = 'notification'

    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    recipient_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    message = db.Column(db.String, nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

class Document(db.Model):
    __tablename__ = 'document'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    apartment_id = db.Column(db.Integer, db.ForeignKey('apartment.id'), nullable=False)
    document_url = db.Column(db.String, nullable=False)


if __name__=='__main__':
    app.run(debug=True)