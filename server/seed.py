from app import db, app, User, Profile, Category, Apartment, Booking, Transaction, Review, Billing, Notification, Document
from faker import Faker
from flask_bcrypt import Bcrypt
from random import randint, choice
from datetime import datetime, timedelta

fake = Faker()
bcrypt = Bcrypt()

# Creating fake users
def create_fake_users(count=15):
    roles = ['Admin', 'Tenant', 'Landlord']
    
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

# Creating fake profiles
def create_fake_profiles():
    # Query all existing users
    users = User.query.all()

    # Iterate over each user
    for user in users:
        # Check if the user already has a profile
        if not user.profile:
            # Generate fake profile details
            firstname = fake.first_name()
            middlename = fake.first_name()
            surname = fake.last_name()
            contact = fake.phone_number()
            address = fake.address()
            passport_url = fake.image_url()
            identification_card_url = fake.image_url()
            
            # Create a new profile instance
            profile = Profile(
                user_id=user.user_id,
                firstname=firstname,
                middlename=middlename,
                surname=surname,
                contact=contact,
                address=address,
                passport_url=passport_url,
                identification_card_url=identification_card_url
            )
            
            # Add the profile instance to the session
            db.session.add(profile)

    db.session.commit()

#categories for grouping of apartments
def create_fake_categories():
    categories = [
        'Bedsitter', '1 Bedroom', '2 Bedroom', '3 Bedroom',
        'Bungalow', 'Singles', 'Studios', 'Male Hostel', 'Female Hostel'
    ]

    for category_name in categories:
        category = Category(category_name=category_name)
        db.session.add(category)

    db.session.commit()

#creating fake apartments
def create_fake_apartments(count=15):
    categories = Category.query.all()
    landlords = User.query.filter_by(role='Landlord').all()

    for landlord in landlords:
        # For each landlord, create multiple apartments
        for _ in range(count):
            category = choice(categories)
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
                landlord_id=landlord.user_id,
                category_id=category.category_id,
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

#creating fake bookings from tenants
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
            tenant_id=tenant.user_id,
            apartment_id=apartment.apartment_id,
            description=description,
            payment=payment,
            timestamp=timestamp
        )
        db.session.add(booking)

    db.session.commit()

#creating fake transactions 
def create_fake_transactions(count=15):
    # Query all users and apartments
    users = User.query.all()
    apartments = Apartment.query.all()

    for _ in range(count):
        # Randomly select payer and payee
        payer = choice(users)
        payee = choice(users)

        # Ensure payer and payee are different users
        while payer == payee:
            payer = choice(users)
            payee = choice(users)

        # Randomly select an apartment
        apartment = choice(apartments)

        # Generate a random purpose
        purpose = fake.text(max_nb_chars=50)

        # Generate a random amount
        amount = randint(5000, 50000)  

        # Generate a random timestamp within the last 30 days
        timestamp = datetime.utcnow() - timedelta(days=randint(1, 30))

        # Create the transaction
        transaction = Transaction(
            payer_id=payer.user_id,
            payee_id=payee.user_id,
            apartment_id=apartment.apartment_id,
            purpose=purpose,
            amount=amount,
            timestamp=timestamp
        )
        db.session.add(transaction)
        db.session.commit()


#creating fake reviews
def create_fake_reviews(count=20):
    # Query all users
    users = User.query.all()

    for _ in range(count):
        # Randomly select a user to review
        reviewed_user = choice(users)

        # Generate a random rating
        rating = randint(1, 5)  

        # Generate a random comment
        comment = fake.text(max_nb_chars=200)

        # Create the review
        review = Review(
            user_id=reviewed_user.user_id,
            rating=rating,
            comment=comment
        )
        db.session.add(review)

    db.session.commit()

#creating fake billings for apartment's tenants
def create_fake_billings(count=10):
    # Query all apartments
    apartments = Apartment.query.all()

    for _ in range(count):
        # Randomly select an apartment
        apartment = choice(apartments)

        # Get the apartment's landlord
        landlord = User.query.filter_by(user_id=apartment.landlord_id).first()  # Change here

        # Randomly select a tenant (resident)
        tenant = User.query.filter_by(role='Tenant').first()

        # Generate a random amenity
        amenity = fake.word()

        # Generate a random amount
        amount = randint(5000, 45000)

        # Generate a random status
        status = choice(['pending', 'paid'])

        # Create the billing
        billing = Billing(
            apartment_id=apartment.apartment_id,
            apartment_owner_id=landlord.user_id,
            resident_id=tenant.user_id,  
            amenity=amenity,
            amount=amount,
            status=status,
            timestamp=datetime.utcnow()
        )
        db.session.add(billing)

    db.session.commit()


#creating fake notifications
def create_fake_notifications(count=10):
    # Query all users
    users = User.query.all()

    for _ in range(count):
        # Randomly select a sender
        sender = choice(users)

        # Randomly select a recipient (excluding the sender)
        recipient = choice([user for user in users if user != sender])

        # Generate a fake message
        message = fake.sentence()

        # Create the notification
        notification = Notification(
            sender_id=sender.user_id,
            recipient_id=recipient.user_id,
            message=message,
            timestamp=datetime.utcnow()
        )
        db.session.add(notification)

    db.session.commit()

#creating fake documents
def create_fake_documents(count=10):
    # Query all users and apartments
    users = User.query.all()
    apartments = Apartment.query.all()

    for _ in range(count):
        # Randomly select a user and apartment
        user = choice(users)
        apartment = choice(apartments)

        # Generate a fake document URL
        document_url = fake.url()

        # Create the document
        document = Document(
            user_id=user.user_id,
            apartment_id=apartment.apartment_id,
            document_url=document_url
        )
        db.session.add(document)

    db.session.commit()

if __name__ == "__main__":
    with app.app_context():
        create_fake_users()
        create_fake_profiles()
        create_fake_categories()
        create_fake_apartments()
        create_fake_bookings()
        create_fake_transactions()
        create_fake_reviews()
        create_fake_billings()
        create_fake_notifications()
        create_fake_documents()
        print ("Data Seeded Successfully!.")
