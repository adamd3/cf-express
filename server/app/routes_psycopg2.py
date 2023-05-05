
params = {
    'dbname': 'your_database_name',
    'user': 'your_username',
    'password': 'your_password',
    'host': "localhost",
    'port': "5432"
}

def get_gene_expression(gene, group, timepoint, cell):
    conn = psycopg2.connect(**params)
    cur = conn.cursor()
    query = """
        SELECT gene_id, group_id, timepoint_id, cell_type, value
        FROM expression_values
        WHERE gene_name = %s
        AND group_id = %s
        AND timepoint_id = %s
        AND cell_type = %s
        """ 
    params = (gene, group, timepoint, cell)
    cur.execute(query, params)
    results = cur.fetchall()
    cur.close()
    conn.close()
    results = {}
    for row in results:
        gene_id, group_id, timepoint_id, cell_type, value = row
        results[(gene_id, group_id, timepoint_id, cell_type)] = value
    return jsonify(results)

    return json.dumps(data)


@app.route('/api/gene_expression')
def gene_expression():
    gene = request.args.get('gene')
    group = request.args.get('group')
    timepoint = request.args.get('timepoint')
    cell = request.args.get('cell')
    expression_data = [row[0] for row in result]
    return expression_values

if __name__ == '__main__':
    app.run(debug=True)
