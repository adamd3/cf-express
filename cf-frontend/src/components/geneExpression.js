import React, { useState } from 'react';
import axios from 'axios';

function GeneExpression() {
  const [geneName, setGeneName] = useState('');
  const [expressionValue, setExpressionValue] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.get('/api/gene_expression', {
      params: { gene_name: geneName },
    });
    setExpressionValue(response.data.expression_value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={geneName}
          onChange={(e) => setGeneName(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {expressionValue && (
        <p>
          The expression value of {geneName} is
          {expressionValue}.
        </p>
      )}
    </div>
  );
}

export default GeneExpression;
