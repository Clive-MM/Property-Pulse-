from flask import render_template, jsonify, request,make_response
from app import app, db, User, Profile,Category, Apartment, Booking, Transaction, Review, Billing, Notification
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import cloudinary.uploader
import cloudinary.api
from datetime import datetime

# Initialize the bcrypt
bcrypt = Bcrypt(app)

# Initialize the JWT manager
jwt = JWTManager(app)

# Set the secret key for JWT
app.config['JWT_SECRET_KEY'] = 'VMt9di-MO_mHm0vluuMzpiUaQIWC2Mi50lkuA3p4IUs'

# Registration of a new user
@app.route('/register', methods=['POST'])
def user_registration():
    data = request.get_json()
    username = data.get('username')
    role = data.get('role')
    email = data.get('email')
    password = data.get('password')

    # Check password complexity
    if len(password) < 8:
        return jsonify({'message': 'Password must be at least 8 characters long!'}), 400
    if not any(char.isupper() for char in password):
        return jsonify({'message': 'Password must contain at least one uppercase letter!'}), 400
    if not any(char.islower() for char in password):
        return jsonify({'message': 'Password must contain at least one lowercase letter!'}), 400
    if not any(char.isdigit() for char in password):
        return jsonify({'message': 'Password must contain at least one digit!'}), 400
    if not any(char in '!@#$%^&*()_+-=[]{}|;:,.<>?/~`' for char in password):
        return jsonify({'message': 'Password must contain at least one special character!'}), 400

    # Check role validity
    roles = ['Admin', 'Tenant', 'Landlord']
    if role not in roles:
        return jsonify({'message': 'Invalid role! Role must be one of: Admin, Tenant, Landlord'}), 400

    # Check if username already exists
    if User.query.filter_by(username=username).first():
        return jsonify({'message': 'Username already exists!'}), 400

    # Check if email already exists
    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'Email already exists!'}), 400

    # Hash the password
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    # Create a new user instance
    new_user = User(
        username=username,
        role=role,
        email=email,
        password=hashed_password
    )

    # Add the new user to the database session
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User created successfully!'}), 200


# Route for user login
@app.route('/login', methods=['POST'])
def user_login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()

    if user and bcrypt.check_password_hash(user.password, password):
        access_token = create_access_token(identity={'user_id': user.user_id})
        return jsonify({'access_token': access_token, 'message': 'Login successful'}), 200
    else:
        return jsonify({'message': 'Invalid Credentials!'}), 401


# Setting up user profile
@app.route('/profile', methods=['POST'])
@jwt_required()
def create_profile():
    # Get the user ID from the JWT token
    current_user = get_jwt_identity()

    # Extract user_id from the current_user dictionary
    current_user_id = current_user['user_id']

    # Print the user ID and its data type
    print("User ID:", current_user_id)
    print("Data type of User ID:", type(current_user_id))

    # Check if the user is registered
    existing_user = User.query.get(current_user_id)
    if not existing_user:
        return jsonify({'message': 'Only registered users can create their Profiles!'}),400

    data = request.get_json()

    # Extract the user profile attributes
    firstname = data.get('firstname')
    middlename = data.get('middlename')
    surname = data.get('surname')
    contact = data.get('contact')
    address = data.get('address')
    passport_url = data.get('passport_url')
    identification_card_url = data.get('identification_card_url')

    # Create a new profile instance for the existing user
    new_profile = Profile(
        user_id=current_user_id,
        firstname=firstname,
        middlename=middlename,
        surname=surname,
        contact=contact,
        address=address,
        passport_url=passport_url,
        identification_card_url=identification_card_url
    )

    db.session.add(new_profile)
    db.session.commit()

    return jsonify({'message': 'Profile created successfully!'}),200

#Fetching,editing and updating user profile
@app.route('/edit_profile', methods=['GET', 'POST'])
@jwt_required()
def edit_profile():
    try:
        # Get the user ID from the JWT token
        current_user = get_jwt_identity()
        current_user_id = current_user['user_id']
        
        # Check if the user is registered
        existing_user = User.query.get(current_user_id)
        if not existing_user:
            return jsonify({'message': 'User not registered!'}), 400

        if request.method == 'GET':
            # Query the Profile table to get the user's profile
            profile = Profile.query.filter_by(user_id=current_user_id).first()
            if not profile:
                return jsonify({'message': 'Profile not found!'}), 404

            # Create a dictionary to hold the profile data
            profile_data = {
                'firstname': profile.firstname,
                'middlename': profile.middlename,
                'surname': profile.surname,
                'contact': profile.contact,
                'address': profile.address,
                'passport_url': profile.passport_url,
                'identification_card_url': profile.identification_card_url
            }

            # Pass the profile data to the template
            return render_template('profile.html', user=existing_user, profile=profile_data)

        elif request.method == 'POST':
            data = request.form
            existing_user.firstname = data.get('firstname')
            existing_user.middlename = data.get('middlename')
            existing_user.surname = data.get('surname')
            existing_user.contact = data.get('contact')
            existing_user.address = data.get('address')
            existing_user.passport_url = data.get('passport_url')
            existing_user.identification_card_url = data.get('identification_card_url')

            db.session.commit()

            return jsonify({'message': 'Profile updated successfully!'}), 200
    except Exception as e:
        return jsonify({'message': str(e)}), 500

    # Default response if no condition is met
    return jsonify({'status': 'error', 'message': 'Method not supported'}), 405

#file upload route
@app.route('/upload', methods=['POST'])
def upload_file():
    if request.method == 'POST':
        file = request.files['file']
        upload_result = cloudinary.uploader.upload(file)
        # Handle the upload result
        return jsonify(upload_result)
    
#creating a category
@app.route('/create_category', methods=['POST'])
@jwt_required()
def create_category():
    try:
        # Get the user ID from the JWT
        current_user = get_jwt_identity()
        current_user_id = current_user['user_id']

        # Check if the user is registered
        existing_user = User.query.get(current_user_id)
        if not existing_user:
            return jsonify({'message': 'User not registered!'}), 400

        # Check if the user is an admin or landlord
        if existing_user.role not in ['Admin', 'Landlord']:
            return jsonify({'message': 'Operation not authorized!'}), 403

        # Get category data from request JSON
        data = request.get_json()
        category_name = data.get('category_name')

        # Check if category name is provided
        if not category_name:
            return jsonify({'message': 'Category name is required!'}), 400

        # Check if category with the same name already exists
        existing_category = Category.query.filter_by(category_name=category_name).first()
        if existing_category:
            return jsonify({'message': 'Category with this name already exists!'}), 409

        # Create a new category instance
        new_category = Category(category_name=category_name)
        
        # Add and commit the new category to the database
        db.session.add(new_category)
        db.session.commit()

        return jsonify({'message': 'Category created successfully!'}), 201
    except Exception as e:
        return jsonify({'message': 'An error occurred while creating the category.', 'error': str(e)}), 500



#Fetching Categories 
@app.route('/categories', methods=['GET'])
def get_categories():
    try:
        # Query the categories
        categories = Category.query.all()

        # Initialize an empty list to store category data
        category_list = []

        # Iterate through the categories and construct the category data
        for category in categories:
            category_data = {
                'category_id': category.category_id,
                'category_name': category.category_name
            }
            category_list.append(category_data)

        # Return the list of categories as JSON response
        return jsonify({'categories': category_list}), 200
    except Exception as e:
        # If an error occurs, return an error message
        return jsonify({'message': 'Error fetching categories', 'error': str(e)}), 500

#creating an apartment
@app.route('/create_apartment', methods=['POST'])
@jwt_required()
def create_apartment():
    try:
        # Extract the userID from the JWT
        current_user = get_jwt_identity()
        current_user_id = current_user['user_id']

        # Check if the user is registered
        existing_user = User.query.get(current_user_id)
        if not existing_user:
            return jsonify({'message': 'User not registered!'}), 400

        # Check if the user is a landlord or admin
        if existing_user.role not in ['Admin', 'Landlord']:
            return jsonify({'message': 'User not authorized!'}), 403

        # Data about new apartment
        data = request.get_json()
        apartment_name = data.get('apartment_name')
        category_name = data.get('category_name')
        description = data.get('description')
        location = data.get('location')
        address = data.get('address')
        amenities = data.get('amenities')
        lease_agreement = data.get('lease_agreement')
        image_url = data.get('image_url')
        status = data.get('status', 'Vacant')  

        # Check if all required fields are provided
        if not all([apartment_name, category_name, description, location, address, amenities, lease_agreement, image_url]):
            return jsonify({'message': 'All fields are required!'}), 400

        # Get landlord ID from current user ID
        landlord_id = current_user_id

        # Check if the category exists and get its ID
        category = Category.query.filter_by(category_name=category_name).first()
        if not category:
            return jsonify({'message': 'Category does not exist!'}), 404
        category_id = category.category_id

        # Create an instance of the apartment
        new_apartment = Apartment(
            apartment_name=apartment_name,
            landlord_id=landlord_id,
            category_id=category_id,
            description=description,
            location=location,
            address=address,
            amenities=amenities,
            lease_agreement=lease_agreement,
            image_url=image_url,
            status=status
        )

        db.session.add(new_apartment)
        db.session.commit()

        return jsonify({'message': 'Apartment created successfully!'}), 201
    except Exception as e:
        return jsonify({'message': 'An error occurred while creating the apartment.', 'error': str(e)}), 500


#Viewing Bookings associated with a specific apartment 
@app.route('/bookings', methods=['GET'])
@jwt_required()
def view_bookings():
    try:
        # Capture userID from JWT
        current_user = get_jwt_identity()
        current_user_id = current_user['user_id']

        # Check if user is registered
        existing_user = User.query.get(current_user_id)
        if not existing_user:
            return jsonify({'message': 'User not registered!'}), 400

        # Check if user is a landlord or admin
        if existing_user.role not in ['Admin', 'Landlord']:
            return jsonify({'message': 'User not authorized!'}), 403

        # Query for bookings associated with that landlord
        if existing_user.role == 'Admin':
            # If user is admin, fetch all bookings
            bookings = Booking.query.all()
        else:
            # If user is a landlord, fetch bookings associated with their apartments
            bookings = Booking.query.filter(Booking.apartment_id.in_([apartment.apartment_id for apartment in existing_user.apartments]))

        # Initialize a list to store booking data
        booking_list = []

        # Iterate through the bookings and construct the booking data
        for booking in bookings:
            tenant_username = User.query.get(booking.tenant_id).username
            apartment_name = Apartment.query.get(booking.apartment_id).apartment_name

            booking_data = {
                'tenant_username': tenant_username,
                'apartment_name': apartment_name,
                'description': booking.description,
                'payment': booking.payment
            }
            booking_list.append(booking_data)

        return jsonify({'bookings': booking_list, 'message': 'Bookings fetched successfully!'}), 200
    except Exception as e:
        return jsonify({'message': 'An error occurred while fetching bookings.', 'error': str(e)}), 500

#Fetching transactions related to a specific apartment
@app.route('/get_transactions', methods=['GET'])
@jwt_required()
def fetch_transactions():
    try:
        # Capture userID
        current_user = get_jwt_identity()
        current_user_id = current_user['user_id']

        # Check if the user is registered
        existing_user = User.query.get(current_user_id)
        if not existing_user:
            return jsonify({'message': 'User not registered!'}), 400

        # Check if user is an admin, landlord, or tenant
        if existing_user.role not in ['Admin', 'Landlord', 'Tenant']:
            return jsonify({'message': 'Operation not authorized!'}), 403

        # Initialize a list to store transaction data
        transaction_list = []

        # Check for transactions for admin or landlord
        if existing_user.role in ['Admin', 'Landlord']:
            transactions = Transaction.query.filter(Transaction.payee_id == current_user_id)

        # Check for transactions for a tenant
        else:
            transactions = Transaction.query.filter_by(payer_id=current_user_id)

        # Iterate through the transactions and construct the transaction data
        for transaction in transactions:
            payer_username = User.query.get(transaction.payer_id).username
            payee_username = User.query.get(transaction.payee_id).username
            apartment_name = Apartment.query.get(transaction.apartment_id).apartment_name

            transaction_data = {
                'payer_username': payer_username,
                'payee_username': payee_username,
                'apartment_name': apartment_name,
                'amount': transaction.amount,
                'purpose': transaction.purpose,
                'timestamp': transaction.timestamp,
            }
            transaction_list.append(transaction_data)

        return jsonify({'transactions': transaction_list, 'message': 'Transactions fetched successfully!'}), 200
    except Exception as e:
        return jsonify({'message': 'An error occurred while fetching transactions.', 'error': str(e)}), 500

#Route for posting areview
@app.route('/review', methods=['POST'])
@jwt_required()
def posting_review():
    try:
        # Capture userID
        current_user = get_jwt_identity()
        current_user_id = current_user['user_id']

        # Check if the user is registered
        existing_user = User.query.get(current_user_id)
        if not existing_user:
            return jsonify({'message': 'User not registered!'}), 400

        # Get data from request
        data = request.get_json()
        rating = data.get('rating')
        comment = data.get('comment')

        # Create an instance of review
        new_review = Review(
            user_id=current_user_id,  
            rating=rating,
            comment=comment
        )
        db.session.add(new_review)
        db.session.commit()

        return jsonify({'message': 'Review posted successfully!'}), 200
    except Exception as e:
        return jsonify({'message': 'An error occurred while posting the review.', 'error': str(e)}), 500

#Fetching review 
@app.route('/fetch_reviews', methods=['GET'])
@jwt_required()
def fetch_reviews():
    
    # Capture userID
    current_user = get_jwt_identity()
    current_user_id = current_user['user_id']

    # Check if user is registered
    existing_user = User.query.get(current_user_id)
    if not existing_user:
        return jsonify({'message': 'User not registered!'}), 400

    # Check if the user is an admin
    if existing_user.role != 'Admin':
        return jsonify({'message': 'User not Authorized!'}), 403

    # Fetch all reviews
    reviews = Review.query.all()

    # Initialize a list to store review data
    review_list = []

    # Iterate through the reviews and construct the review data
    for review in reviews:
        # Fetch the username associated with the user_id
        user = User.query.get(review.user_id)
        if user:
            username = user.username
        else:
            username = "Unknown"

        review_data = {
            'username': username,
            'rating': review.rating,
            'comment': review.comment
        }
        review_list.append(review_data)

    return jsonify({'reviews': review_list, 'message': 'Reviews retrieved successfully'}), 200



#Creating a bill for a tenant 
@app.route('/create_billing', methods=['POST'])
@jwt_required()
def create_billing():

    # Capture userID
    current_user = get_jwt_identity()
    current_user_id = current_user['user_id']

    # Check if the user is registered
    existing_user = User.query.get(current_user_id)
    if not existing_user:
        return jsonify({'message': 'User not registered!'}), 400

    # Check role of user
    if existing_user.role not in ['Admin', 'Landlord']:
        return jsonify({'message': 'User not authorized!'}), 403
    
    # Extracting data from request
    data = request.get_json()
    amenity = data.get('amenity')
    amount = data.get('amount')
    status = data.get('status')

    # Get the current user's apartment
    apartment = Apartment.query.filter_by(landlord_id=current_user_id).first()
    if not apartment:
        return jsonify({'message': 'Apartment not found for the current user!'}), 404

    # Extracting resident_id from request data
    resident_id = data.get('resident_id')
    # Validate resident_id
    resident = User.query.get(resident_id)
    if not resident:
        return jsonify({'message': 'Resident not found!'}), 404

    # Creating a new instance of Billing
    new_billing = Billing(
        apartment_id=apartment.apartment_id,
        apartment_owner_id=current_user_id,
        resident_id=resident_id,
        amenity=amenity,
        amount=amount,
        status=status,
        timestamp=datetime.utcnow()
    )

    db.session.add(new_billing)
    db.session.commit()

    return jsonify({'message': 'Bill created successfully!'}), 200

#Route for fetching the billings for a specific recipient
@app.route('/fetch_billings', methods=['GET'])
@jwt_required()
def fetch_billings():

    # Capture userID
    current_user = get_jwt_identity()
    current_user_id = current_user['user_id']

    # Check if the user is registered
    existing_user = User.query.get(current_user_id)
    if not existing_user:
        return jsonify({'message': 'User not found!'}), 400

    # Initialize query to None
    billings_query = None

    # Check current user role
    if existing_user.role == 'Admin':
        # Admin views all billings
        billings_query = Billing.query.all()
    elif existing_user.role == 'Landlord':
        # Landlord views billings of apartments associated with them
        billings_query = Billing.query.filter_by(apartment_owner_id=current_user_id).all()
    elif existing_user.role == 'Tenant':
        # Tenant views their own billings
        billings_query = Billing.query.filter_by(resident_id=current_user_id).all()

    # Initialize a list to store billing data
    billings_list = []

    # Iterate through the billings and construct the billing data
    for billing in billings_query:
        billing_data = {
            'billing_id': billing.billing_id,
            'apartment_id': billing.apartment_id,
            'apartment_owner_id': billing.apartment_owner_id,
            'resident_id': billing.resident_id,
            'amenity': billing.amenity,
            'amount': billing.amount,
            'status': billing.status,
            'timestamp': billing.timestamp
        }
        billings_list.append(billing_data)

    return jsonify({'billings': billings_list, 'message': 'Billings fetched successfully!'}), 200

#Sending a notification
@app.route('/send_notification', methods=['POST'])
@jwt_required()
def send_notification():

    # Capture userID
    current_user = get_jwt_identity()
    current_user_id = current_user['user_id']

    # Check if the user is registered
    existing_user = User.query.get(current_user_id)
    if not existing_user:
        return jsonify({'message': 'User not Registered!'}), 400
    
    data = request.get_json()
    message = data.get('message')
    timestamp = data.get('timestamp')
    recipient_username = data.get('recipient_username')

    # Query the User table to get recipient_id
    recipient_user = User.query.filter_by(username=recipient_username).first()
    if not recipient_user:
        return jsonify({'message': 'Recipient user not found!'}), 404
    recipient_id = recipient_user.user_id

    new_notification = Notification(
       sender_id=current_user_id,
       recipient_id=recipient_id,
       message=message,
       timestamp=timestamp
    )
    db.session.add(new_notification)
    db.session.commit()

    return jsonify({'message': 'Notification created successfully!'}), 200

#Fetching notifications 
@app.route('/notifications', methods=['GET'])
@jwt_required()
def get_notifications():

    # Capture user ID from JWT
    current_user = get_jwt_identity()
    current_user_id = current_user['user_id']

    # Check if the user is registered
    existing_user = User.query.get(current_user_id)
    if not existing_user:
        return jsonify({'message': 'User not found'}), 400

    # Query notifications where the current user is either sender or recipient
    notifications = Notification.query.filter(
        (Notification.sender_id == current_user_id) |
        (Notification.recipient_id == current_user_id)
    ).all()

    # Initialize a list to store notification data
    notification_list = []

    # Iterate through the notifications and construct the notification data
    for notification in notifications:
        sender_username = User.query.get(notification.sender_id).username
        recipient_username = User.query.get(notification.recipient_id).username

        notification_data = {
            'sender_username': sender_username,
            'recipient_username': recipient_username,
            'message': notification.message,
            'timestamp': notification.timestamp
        }
        notification_list.append(notification_data)

    return jsonify({'notifications': notification_list}), 200


#user logging out
@app.route('/logout', methods=['POST'])
def logout():
    # Clear the user's session cookie
    response = make_response(jsonify({'message': 'Logout successful'}), 200)
    response.set_cookie('session', '', expires=0)
    return response

#Viewing apartments
@app.route('/apartments', methods=['GET'])
@jwt_required()
def fetch_apartments():
    # Capture userID
    current_user = get_jwt_identity()
    current_user_id = current_user['user_id']

    # Check if the user is registered
    existing_user = User.query.get(current_user_id)
    if not existing_user:
        return jsonify({'message': 'User not registered!'}), 400

    # Query for apartments available
    apartments = Apartment.query.all()

    apartment_list = []

    for apartment in apartments:
        apartment_data = {
            'apartment_id': apartment.apartment_id,
            'apartment_name': apartment.apartment_name,
            'landlord_id': apartment.landlord_id,
            'category_id': apartment.category_id,
            'description': apartment.description,
            'location': apartment.location,
            'address': apartment.address,
            'amenities': apartment.amenities,
            'lease_agreement': apartment.lease_agreement,
            'image_url': apartment.image_url,
            'status': apartment.status
        }
        apartment_list.append(apartment_data)

    return jsonify({'apartments': apartment_list, 'message': 'Apartments fetched successfully'}), 200

#creating a booking 
@app.route('/create_booking', methods=['POST'])
@jwt_required()
def create_booking():

    # Capture userID
    current_user = get_jwt_identity()
    current_user_id = current_user['user_id']

    # Check if the user is registered
    existing_user = User.query.get(current_user_id)
    if not existing_user:
        return jsonify({'message': 'User not registered!'}), 400
    
    # Check for the role of user
    if existing_user.role != 'Tenant':
        return jsonify({'message': 'Operation not authorized!'}), 403

    data = request.get_json()
    apartment_id = data.get('apartment_id')
    description = data.get('description')
    payment = data.get('payment')
    timestamp = datetime.utcnow()

    # Create a new booking instance
    new_booking = Booking(
        tenant_id=current_user_id,
        apartment_id=apartment_id,
        description=description,
        payment=payment,
        timestamp=timestamp
    )

    db.session.add(new_booking)
    db.session.commit()

    return jsonify({'message': 'Booking created successfully!'}), 200

#Making transaction
@app.route('/create_transaction', methods=['POST'])
@jwt_required()
def create_transaction():

    # Capture userID
    current_user = get_jwt_identity()
    current_user_id = current_user['user_id']

    # Check if the user is registered and has the role of landlord or tenant
    existing_user = User.query.filter(User.user_id == current_user_id, User.role.in_(['Landlord', 'Tenant'])).first()
    if not existing_user:
        return jsonify({'message': 'User not registered or not authorized to perform this action!'}), 400

    data = request.get_json()
    payer_id = current_user_id
    payee_id = data.get('payee_id')
    apartment_id = data.get('apartment_id')
    purpose = data.get('purpose')
    amount = data.get('amount')
    timestamp = datetime.utcnow()

    # Create a new transaction instance
    new_transaction = Transaction(
        payer_id=payer_id,
        payee_id=payee_id,
        apartment_id=apartment_id,
        purpose=purpose,
        amount=amount,
        timestamp=timestamp
    )

    db.session.add(new_transaction)
    db.session.commit()

    return jsonify({'message': 'Transaction created successfully!'}), 200

#Fetching users for admin
@app.route('/fetch_registered_users', methods=['GET'])
@jwt_required()
def fetch_registered_users():
    try:
        # Capture user ID
        current_user = get_jwt_identity()
        current_user_id = current_user['user_id']

        # Check if the user is registered and has the role of Admin
        existing_user = User.query.get(current_user_id)
        if not existing_user or existing_user.role != 'Admin':
            return jsonify({'message': 'Unauthorized access!'}), 403

        # Fetch all registered users
        registered_users = User.query.all()

        # Initialize a list to store user data
        users_list = []

        # Iterate through registered users and construct user data
        for user in registered_users:
            user_data = {
                'user_id': user.user_id,
                'username': user.username,
                'email': user.email,
                'role': user.role
            }
            users_list.append(user_data)

        return jsonify({'users': users_list, 'message': 'Registered users fetched successfully!'}), 200
    except Exception as e:
        return jsonify({'message': 'An error occurred while fetching registered users.', 'error': str(e)}), 500

#Admin updating user details 
@app.route('/users/<int:user_id>', methods=['PUT'])
@jwt_required()
def update_user(user_id):
    try:
        # Ensure only admin can access this route
        current_user = get_jwt_identity()
        if current_user['role'] != 'Admin':
            return jsonify({'message': 'Operation not authorized!'}), 403

        # Fetch the user to be updated
        user = User.query.get(user_id)
        if not user:
            return jsonify({'message': 'User not found!'}), 404

        # Parse request data
        data = request.get_json()
        # Update user details
        if 'username' in data:
            user.username = data['username']
        if 'email' in data:
            user.email = data['email']
        if 'role' in data:
            user.role = data['role']
        # Commit changes to the database
        db.session.commit()

        return jsonify({'message': 'User details updated successfully!'}), 200
    except Exception as e:
        return jsonify({'message': 'An error occurred while updating user details.', 'error': str(e)}), 500

#Admin can delete user
@app.route('/users/<int:user_id>', methods=['DELETE'])
@jwt_required()
def delete_user(user_id):
    try:
        # Ensure only admin can access this route
        current_user = get_jwt_identity()
        if current_user['role'] != 'Admin':
            return jsonify({'message': 'Operation not authorized!'}), 403

        # Fetch the user to be deleted
        user = User.query.get(user_id)
        if not user:
            return jsonify({'message': 'User not found!'}), 404

        # Delete the user from the database
        db.session.delete(user)
        db.session.commit()

        return jsonify({'message': 'User deleted successfully!'}), 200
    except Exception as e:
        return jsonify({'message': 'An error occurred while deleting user.', 'error': str(e)}), 500


#Admin can create new users
@app.route('/users', methods=['POST'])
@jwt_required()
def create_user():
    try:
        # Ensure only admin can access this route
        current_user = get_jwt_identity()
        if current_user['role'] != 'Admin':
            return jsonify({'message': 'Operation not authorized!'}), 403

        # Parse request data
        data = request.get_json()
        username = data.get('username')
        email = data.get('email')
        role = data.get('role')
        password = data.get('password')

        # Validate username and email uniqueness
        existing_username = User.query.filter_by(username=username).first()
        existing_email = User.query.filter_by(email=email).first()

        if existing_username:
            return jsonify({'message': 'Username already exists!'}), 400
        if existing_email:
            return jsonify({'message': 'Email already exists!'}), 400

        # Create new user instance
        new_user = User(
            username=username,
            email=email,
            role=role,
            password=password
        )

        # Add new user to the database
        db.session.add(new_user)
        db.session.commit()

        return jsonify({'message': 'User created successfully!'}), 201
    except Exception as e:
        return jsonify({'message': 'An error occurred while creating user.', 'error': str(e)}), 500


#An admin can delete a category
@app.route('/categories/<int:category_id>', methods=['DELETE'])
@jwt_required()
def delete_category(category_id):
    try:
        # Ensure only admin can access this route
        current_user = get_jwt_identity()
        if current_user['role'] != 'Admin':
            return jsonify({'message': 'Operation not authorized!'}), 403

        # Find the category to delete
        category = Category.query.get(category_id)
        if not category:
            return jsonify({'message': 'Category not found!'}), 404

        # Delete the category
        db.session.delete(category)
        db.session.commit()

        return jsonify({'message': 'Category deleted successfully!'}), 200
    except Exception as e:
        return jsonify({'message': 'An error occurred while deleting category.', 'error': str(e)}), 500

#Admin can update a category 
@app.route('/categories/<int:category_id>', methods=['PUT'])
@jwt_required()
def update_category(category_id):
    try:
        # Ensure only admin can access this route
        current_user = get_jwt_identity()
        if current_user['role'] != 'Admin':
            return jsonify({'message': 'Operation not authorized!'}), 403

        # Find the category to update
        category = Category.query.get(category_id)
        if not category:
            return jsonify({'message': 'Category not found!'}), 404

        # Get updated data from request
        data = request.get_json()
        new_category_name = data.get('category_name')

        # Update category name
        category.category_name = new_category_name
        db.session.commit()

        return jsonify({'message': 'Category updated successfully!'}), 200
    except Exception as e:
        return jsonify({'message': 'An error occurred while updating category.', 'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
