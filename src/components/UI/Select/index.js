import React, { useState } from 'react';
import './index.scss'
import UpIcon from '../../../assets/icons/Up.png';
import DownIcon from '../../../assets/icons/Down.png';

export const Select = (props) => {
    const { isValid, rowKey, name, value, onChange, options } = props;
  
    const [isDropDown, setIsDropDown] = useState(false);
    let dropDownClass = ['noContent'];
    let arrow = <img src={DownIcon} className='arrow' alt='Select'></img> ;
    
    const dropDownItems = options.map((option, index) => {
        return (<li 
                    value={option.value} 
                    key={index}
                    onClick={()=>selectHandler(option.value)}> 
                    {option.text}
                </li>
        );
    });

    const selectHandler = (value) =>{
        if(isDropDown) {
            setIsDropDown(false);
            onChange(rowKey, name, value);
        }
    }

    const showContent = () =>{
        setIsDropDown(!isDropDown);
    }

    if (isDropDown){
        dropDownClass= ['dropContent'];
        arrow = <img src={UpIcon} alt='Select'></img> ;
    }
    else {
        dropDownClass = ['noContent'];
    }
    
    let divClass = ['dropdown']
    if (!isValid) {
        divClass.push('invalid');
    }
    
    return(
        <div className={divClass.join(' ')}>
            <button 
                className='button'
                onClick={() => showContent()}>
                {value === '' ? 'Select an item' : value}
                <span className='arrow'>{arrow}</span>
            </button>
            <div>
                <ul className={dropDownClass.join(' ')}>
                    {dropDownItems}
                </ul>
            </div>
        </div>
    )
};
