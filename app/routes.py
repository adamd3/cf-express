from flask import request, jsonify
from flask_sqlalchemy import SQLAlchemy
from app import app

sqlconfig = 'postgresql://adamdinan:password@localhost/cfexpress_db'
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

    @classmethod
    def get_expression_values(cls, gene, cell):
        results = cls.query.filter_by(gene_id=gene, cell_type=cell).all()
        expression_values = []
        for row in results:
            expression_values.append({
                'gene_id': row.gene_id,
                'group_id': row.group_id,
                'timepoint_id': row.timepoint_id,
                'cell_type': row.cell_type,
                'value': row.value,
            })
        return jsonify(expression_values)
    
@app.route('/api/gene_expression')
def gene_expression():
    gene = request.args.get('gene')
    cell = request.args.get('cell')
    response = ExpressionValue.get_expression_values(gene, cell)
    return response

