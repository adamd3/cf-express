from app import db

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
        return expression_values

