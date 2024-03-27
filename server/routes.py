from flask import render_template, jsonify, request
from app import app, db, User, Profile,Category, Apartment, Booking
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import cloudinary.uploader
import cloudinary.api

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
from flask import jsonify

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


   



        



if __name__ == '__main__':
    app.run(debug=True)
