import pytest
from app import app, db
from routes import ExpressionValue

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


def test_gene_expression_route(client):
    response = client.get('/api/gene_expression?gene=TLR5')
    assert response.status_code == 200
    expected_response = [{
            'gene_id': 8699,
            'group_id': 2,
            'timepoint_id': 2,
            'cell_type': 'Neutophils',
            'value': 5.24167179017928,
            'gene_name': 'TLR5',
        },
        {
            'gene_id': 8699,
            'group_id': 2,
            'timepoint_id': 3,
            'cell_type': 'Neutophils',
            'value': 4.5253315378317,
            'gene_name': 'TLR5',
        }
    ]
    assert response.json == expected_response


def test_gene_options_route(client):
    response = client.get('/api/gene_options')
    assert response.status_code == 200
    expected_response = ['TLR5']
    assert response.json == expected_response


def test_stats_route(client):
    response = client.get('/api/stats')
    assert response.status_code == 200
    assert response.json['total_genes'] == 1
    assert response.json['total_values'] == 2
    assert response.json['total_timepoints'] == 2
    assert response.json['total_groups'] == 1
    assert response.json['total_samples'] == 2
