import os
import pytest
import sys

sys.path.insert(0, '..')
from app import create_app, db
from app.models import ExpressionValue

@pytest.fixture
def client():
    os.environ['FLASK_ENV'] = 'test'
    app = create_app(testing = True)
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
