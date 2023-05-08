import os
import sys
import pytest
from app import app
from app.routes import db, ExpressionValue

@pytest.fixture
def client():
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    with app.test_client() as client:
        with app.app_context():
            db.create_all()
            expr_value_1 = ExpressionValue(
                gene_id = 8699, group_id = 2, 
                timepoint_id = 2, cell_type = 'Neutophils', 
                value = 5.24167179017928, gene_name = 'TLR5'
            )
            expr_value_2 = ExpressionValue(
                gene_id = 8699, group_id = 2, 
                timepoint_id = 3, cell_type = 'Neutophils', 
                value = 4.5253315378317, gene_name = 'TLR5'
            )
            db.session.add_all([expr_value_1, expr_value_2])
            db.session.commit()
        yield client
        db.session.remove()
        db.drop_all()
