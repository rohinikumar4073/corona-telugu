import React, { useState } from 'react';
function Languages (props) {
    let [checked, setChecked] = useState('te');
    let { handleLanguageChange } = props;
    let handleChange = (e) => {
        handleLanguageChange(e.target.value);
        setChecked(e.target.value);
    }
    return (
        <>
            <div className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox"
                    checked={checked === 'te' ? 'checked' : ''}
                    id="inlineCheckbox1"
                    value="te"
                    onChange={handleChange}></input>
                <label className="form-check-label" for="inlineCheckbox1">తెలుగు</label>
            </div>
            <div className="form-check form-check-inline">
                <input className="form-check-input"
                    checked={checked === 'en' ? 'checked' : ''}
                    type="checkbox" id="inlineCheckbox2"
                    value="en"
                    onChange={handleChange}></input>
                <label className="form-check-label" for="inlineCheckbox2">English</label>
            </div>
        </>
    )
}


export default Languages;