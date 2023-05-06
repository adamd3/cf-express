from app import app
from dotenv import load_dotenv
from flask import request, jsonify
from flask_sqlalchemy import SQLAlchemy
import os

load_dotenv()
db_password = os.getenv("DATABASE_PASSWORD")

sqlconfig = f'postgresql://adamdinan:{db_password}@localhost/cfexpress_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = sqlconfig

db = SQLAlchemy(app)

class ExpressionValue(db.Model):
    __tablename__ = 'expression_values'

    id = db.Column(db.Integer, primary_key=True)
    cell_type = db.Column(db.String)
    group_id = db.Column(db.Integer)
    timepoint_id = db.Column(db.Integer)
    gene_id = db.Column(db.Integer)
    value = db.Column(db.Float)
    gene_name = db.Column(db.String)

    @classmethod
    def count_by_gene_name(cls, gene_name):
        count = cls.query.filter_by(gene_name=gene_name).count()
        return count

    @classmethod
    def get_expression_values(cls, gene):
        results = cls.query.filter_by(gene_name=gene).all()
        expression_values = []
        for row in results:
            expression_values.append({
                'gene_id': row.gene_id,
                'group_id': row.group_id,
                'timepoint_id': row.timepoint_id,
                'cell_type': row.cell_type,
                'value': row.value,
                'gene_name': row.gene_name,
            })
        return jsonify(expression_values)
    
@app.route('/api/gene_expression')
def gene_expression():
    gene = request.args.get('gene')
    response = ExpressionValue.get_expression_values(gene)
    return response

@app.route('/api/gene_options')
def gene_options():
    gene_names = ExpressionValue.query.distinct(
        ExpressionValue.gene_name).all()
    gene_names = [row.gene_name for row in gene_names]
    return jsonify(gene_names)

@app.route('/api/stats')
def stats():
    total_genes = ExpressionValue.query.distinct(
        ExpressionValue.gene_name).count()
    total_values = ExpressionValue.query.count()
    total_timepoints = ExpressionValue.query.distinct(
        ExpressionValue.timepoint_id).count()
    total_groups = ExpressionValue.query.distinct(
        ExpressionValue.group_id).count()
    total_samples = ExpressionValue.count_by_gene_name('TLR5')
    return jsonify({
        'total_genes': total_genes, 
        'total_values': total_values,
        'total_timepoints': total_timepoints,
        'total_groups': total_groups,
        'total_samples': total_samples,
        })
