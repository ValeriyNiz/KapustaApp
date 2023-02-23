import css from './DropDown.module.css';
import Sprite from '../../images/sprite.svg';
import { useEffect, useState } from 'react';

export const DropDown = ({ options }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

  useEffect(() => {
    const handler = () => setShowMenu(false);
    window.addEventListener('click', handler);
    return () => {
      window.removeEventListener('click', handler);
    };
  });

  const getDisplay = () => {
    if (selectedValue) {
      return selectedValue.label;
    }

    return 'Product category';
  };

  const handleInputClick = e => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  const onItemClick = option => {
    setSelectedValue(option);
  };

  const isSelected = option => {
    if (!selectedValue) {
      return false;
    }

    return selectedValue.value === option.value;
  };

  return (
    <div className={css.container}>
      <div className={css.input} onClick={handleInputClick}>
        <span className={css.span}>{getDisplay()}</span>
        <svg width="10" height="20">
          <use href={`${Sprite}#dropdown-arrow`}></use>
        </svg>
      </div>
      {showMenu && (
        <div className={css.menu}>
          {options.map(opt => (
            <div
              key={opt.value}
              className={`${css.item} ${isSelected(opt) && 'selected'}`}
              onClick={() => onItemClick(opt)}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
