from flask import request, jsonify, Blueprint
from app.models import ExpressionValue

bp = Blueprint('routes', __name__)

@bp.route('/api/gene_expression')
def gene_expression():
    gene = request.args.get('gene')
    response = ExpressionValue.get_expression_values(gene)
    return response

# @bp.route('/api/gene_expression')
# def gene_expression():
#     gene = request.args.get('gene')
#     expression_values = ExpressionValue.query.filter_by(gene_name=gene).all()
#     response = [{
#             'gene_id': row.gene_id,
#             'group_id': row.group_id,
#             'timepoint_id': row.timepoint_id,
#             'cell_type': row.cell_type,
#             'value': row.value,
#             'gene_name': row.gene_name,
#         } for row in expression_values]
#     return jsonify(response)

@bp.route('/api/gene_options')
def gene_options():
    gene_names = ExpressionValue.query.distinct(
        ExpressionValue.gene_name).all()
    gene_names = [row.gene_name for row in gene_names]
    return jsonify(gene_names)

@bp.route('/api/stats')
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
