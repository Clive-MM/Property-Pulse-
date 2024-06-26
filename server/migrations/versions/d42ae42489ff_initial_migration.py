"""Initial Migration

Revision ID: d42ae42489ff
Revises: 
Create Date: 2024-03-25 10:00:16.572929

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd42ae42489ff'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('category',
    sa.Column('category_id', sa.Integer(), nullable=False),
    sa.Column('category_name', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('category_id'),
    sa.UniqueConstraint('category_name')
    )
    op.create_table('user',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(), nullable=False),
    sa.Column('role', sa.String(), nullable=False),
    sa.Column('email', sa.String(), nullable=False),
    sa.Column('password', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('user_id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('apartment',
    sa.Column('apartment_id', sa.Integer(), nullable=False),
    sa.Column('apartment_name', sa.String(), nullable=False),
    sa.Column('landlord_id', sa.Integer(), nullable=False),
    sa.Column('category_id', sa.Integer(), nullable=False),
    sa.Column('description', sa.String(), nullable=False),
    sa.Column('location', sa.String(), nullable=False),
    sa.Column('address', sa.String(), nullable=False),
    sa.Column('amenities', sa.String(), nullable=False),
    sa.Column('lease_agreement', sa.String(), nullable=False),
    sa.Column('image_url', sa.String(), nullable=False),
    sa.Column('status', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['category_id'], ['category.category_id'], ),
    sa.ForeignKeyConstraint(['landlord_id'], ['user.user_id'], ),
    sa.PrimaryKeyConstraint('apartment_id'),
    sa.UniqueConstraint('apartment_name')
    )
    op.create_table('notification',
    sa.Column('notification_id', sa.Integer(), nullable=False),
    sa.Column('sender_id', sa.Integer(), nullable=False),
    sa.Column('recipient_id', sa.Integer(), nullable=False),
    sa.Column('message', sa.String(), nullable=False),
    sa.Column('timestamp', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['recipient_id'], ['user.user_id'], ),
    sa.ForeignKeyConstraint(['sender_id'], ['user.user_id'], ),
    sa.PrimaryKeyConstraint('notification_id')
    )
    op.create_table('profile',
    sa.Column('profile_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('firstname', sa.String(), nullable=False),
    sa.Column('middlename', sa.String(), nullable=False),
    sa.Column('surname', sa.String(), nullable=False),
    sa.Column('contact', sa.String(), nullable=False),
    sa.Column('address', sa.String(), nullable=False),
    sa.Column('passport_url', sa.String(), nullable=False),
    sa.Column('identification_card_url', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['user.user_id'], ),
    sa.PrimaryKeyConstraint('profile_id'),
    sa.UniqueConstraint('contact'),
    sa.UniqueConstraint('user_id')
    )
    op.create_table('review',
    sa.Column('review_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('rating', sa.Integer(), nullable=True),
    sa.Column('comment', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.user_id'], ),
    sa.PrimaryKeyConstraint('review_id')
    )
    op.create_table('billing',
    sa.Column('billing_id', sa.Integer(), nullable=False),
    sa.Column('apartment_id', sa.Integer(), nullable=False),
    sa.Column('apartment_owner_id', sa.Integer(), nullable=False),
    sa.Column('resident_id', sa.Integer(), nullable=False),
    sa.Column('amenity', sa.String(), nullable=False),
    sa.Column('amount', sa.Integer(), nullable=False),
    sa.Column('status', sa.String(), nullable=False),
    sa.Column('timestamp', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['apartment_id'], ['apartment.apartment_id'], ),
    sa.ForeignKeyConstraint(['apartment_owner_id'], ['user.user_id'], ),
    sa.ForeignKeyConstraint(['resident_id'], ['user.user_id'], ),
    sa.PrimaryKeyConstraint('billing_id')
    )
    op.create_table('booking',
    sa.Column('booking_id', sa.Integer(), nullable=False),
    sa.Column('tenant_id', sa.Integer(), nullable=False),
    sa.Column('apartment_id', sa.Integer(), nullable=False),
    sa.Column('description', sa.String(), nullable=False),
    sa.Column('payment', sa.Integer(), nullable=False),
    sa.Column('timestamp', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['apartment_id'], ['apartment.apartment_id'], ),
    sa.ForeignKeyConstraint(['tenant_id'], ['user.user_id'], ),
    sa.PrimaryKeyConstraint('booking_id')
    )
    op.create_table('document',
    sa.Column('document_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('apartment_id', sa.Integer(), nullable=False),
    sa.Column('document_url', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['apartment_id'], ['apartment.apartment_id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.user_id'], ),
    sa.PrimaryKeyConstraint('document_id')
    )
    op.create_table('transaction',
    sa.Column('transaction_id', sa.Integer(), nullable=False),
    sa.Column('payee_id', sa.Integer(), nullable=False),
    sa.Column('payer_id', sa.Integer(), nullable=False),
    sa.Column('apartment_id', sa.Integer(), nullable=False),
    sa.Column('purpose', sa.String(), nullable=False),
    sa.Column('amount', sa.Integer(), nullable=False),
    sa.Column('timestamp', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['apartment_id'], ['apartment.apartment_id'], ),
    sa.ForeignKeyConstraint(['payee_id'], ['user.user_id'], ),
    sa.ForeignKeyConstraint(['payer_id'], ['user.user_id'], ),
    sa.PrimaryKeyConstraint('transaction_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('transaction')
    op.drop_table('document')
    op.drop_table('booking')
    op.drop_table('billing')
    op.drop_table('review')
    op.drop_table('profile')
    op.drop_table('notification')
    op.drop_table('apartment')
    op.drop_table('user')
    op.drop_table('category')
    # ### end Alembic commands ###
