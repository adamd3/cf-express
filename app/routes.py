from flask import request, jsonify
import psycopg2
from app import app

params = {
    'dbname': 'your_database_name',
    'user': 'your_username',
    'password': 'your_password',
    'host': 'your_host_name',
    'port': 'your_port_number'
}

def get_gene_expression(gene_name):
    conn = psycopg2.connect(**params)
    cur = conn.cursor()
    cur.execute("SELECT expression_value FROM gene_expression WHERE gene_name = %s", (gene_name,))
    expression_value = cur.fetchone()[0]
    conn.close()
    return expression_value

@app.route('/gene_expression')
def gene_expression():
    gene_name = request.args.get('gene_name')
    expression_value = get_gene_expression(gene_name)
    return jsonify(gene_name=gene_name, expression_value=expression_value)

if __name__ == '__main__':
    app.run(debug=True)
