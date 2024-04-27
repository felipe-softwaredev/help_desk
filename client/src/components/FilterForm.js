import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const FilterForm = ({ searchHandler, placeholder }) => {
  const initialState = { term: '' };
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    searchHandler(formData);
  };

  return (
    <>
      <div className="d-flex justify-content-center">
        <form onSubmit={handleSubmit} className="text-center">
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="term"
              name="term"
              value={formData.term}
              onChange={handleChange}
              placeholder={placeholder}
              style={{ width: '106%', padding: '5px' }}
            />
          </div>

          <div className="text-center">
            <button className="btn btn-primary">SEARCH</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default FilterForm;
