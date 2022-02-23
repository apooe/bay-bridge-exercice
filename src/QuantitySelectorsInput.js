import React from 'react';
import PropTypes from 'prop-types';

const QuantitySelectorsInput = ({quantity, onChange}) => {

    const handleChange = (newQuantity) => {
        if(newQuantity<0){
            return;
        }
        onChange(newQuantity)
    }

    return (
        <div className="input-group">
            <div className="input-group-prepend">
                <button className="btn btn-secondary" type="button" disabled={quantity - 1 < 0} onClick={() => handleChange(quantity -1)}>-</button>
            </div>
            <input type="number" className="form-control" value={quantity} onChange={(e) => handleChange(e.target.value)}/>
            <div className="input-group-append">
                <button className="btn btn-dark" type="button" onClick={() => handleChange(quantity + 1)}>+</button>
            </div>
        </div>
    );
};

QuantitySelectorsInput.propTypes = {
    quantity: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
}
export default QuantitySelectorsInput;
