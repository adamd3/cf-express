import os
import sys
import pytest
from app import app
from app.routes import db

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
