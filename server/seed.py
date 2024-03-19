from app import db, User,app,Profile, Category, Apartment, Booking
from faker import Faker
from random import choice
from flask_bcrypt import Bcrypt

fake = Faker()
def create_fake_users(count=15):
    
    roles = ['Admin', 'Tenant', 'Landlord']
    bcrypt = Bcrypt()

    for _ in range(count):
        username = fake.user_name()
        role = choice(roles)
        email = fake.email()
        password = fake.password()

        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

        user = User(
            username=username,
            role=role,
            email=email,
            password=hashed_password
        )
        db.session.add(user)

    db.session.commit()

def generate_fake_profile(user_id):
    firstname = fake.first_name()
    middlename = fake.first_name()
    surname = fake.last_name()
    contact = fake.phone_number()
    address = fake.address()
    passport_url = fake.image_url()
    identification_card_url = fake.image_url()
    
    return {
        'user_id': user_id,
        'firstname': firstname,
        'middlename': middlename,
        'surname': surname,
        'contact': contact,
        'address': address,
        'passport_url': passport_url,
        'identification_card_url': identification_card_url
    }
def create_fake_profiles(profile_count=15):
    users = User.query.all()
    for user in users[:profile_count]:  
        fake_profile = generate_fake_profile(user.id)

        profile = Profile(
            user_id=user.id,
            firstname=fake_profile['firstname'],
            middlename=fake_profile['middlename'],
            surname=fake_profile['surname'],
            contact=fake_profile['contact'],
            address=fake_profile['address'],
            passport_url=fake_profile['passport_url'],
            identification_card_url=fake_profile['identification_card_url']
        )
        db.session.add(profile)

    db.session.commit()


def create_fake_categories():
    categories = [
        'Bedsitter', '1 Bedroom', '2 Bedroom', '3 Bedroom',
        'Bungalow', 'Singles', 'Studios', 'Male Hostel', 'Female Hostel'
    ]

    for category_name in categories:
        category = Category(category_name=category_name)
        db.session.add(category)

    db.session.commit()


def create_fake_apartments(count=15):
    categories = Category.query.all()
    landlords = User.query.filter_by(role='Landlord').all()

    for _ in range(count):
        category = choice(categories)
        landlord = choice(landlords)
        apartment_name = fake.name()
        description = fake.text()
        location = fake.city()
        address = fake.address()
        amenities = fake.sentence()
        lease_agreement = fake.url()
        image_url = fake.image_url()
        status = choice(['Available', 'Fully Occupied'])  

        apartment = Apartment(
            apartment_name=apartment_name,
            landlord_id=landlord.id,  
            category_id=category.id,
            description=description,
            location=location,
            address=address,
            amenities=amenities,
            lease_agreement=lease_agreement,
            image_url=image_url,
            status=status
        )
        db.session.add(apartment)

    db.session.commit()



def create_fake_bookings(count=10):
    tenants = User.query.filter_by(role='Tenant').all()
    apartments = Apartment.query.all()

    for _ in range(count):
        tenant = choice(tenants)
        apartment = choice(apartments)
        description = fake.text()
        payment = fake.random_int(5000, 20000)  
        timestamp = fake.date_time_between(start_date='-1y', end_date='now')  

        booking = Booking(
            tenant_id=tenant.id,
            apartment_id=apartment.id,
            description=description,
            payment=payment,
            timestamp=timestamp
        )
        db.session.add(booking)

    db.session.commit()


if __name__ == "__main__":
    create_fake_users()
    create_fake_profiles()
    create_fake_categories()
    create_fake_apartments()
    create_fake_bookings()
