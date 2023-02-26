import css from './DropDown.module.css';
import Sprite from '../../images/sprite.svg';
import { useEffect, useState } from 'react';

export const DropDown = ({
  options,
  selectedDropValue,
  setSelectedDropValue,
}) => {
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const handler = () => setShowMenu(false);
    window.addEventListener('click', handler);
    return () => {
      window.removeEventListener('click', handler);
    };
  });

  const getDisplay = () => {
    if (selectedDropValue) {
      return selectedDropValue.label;
    }

    return 'Product category';
  };

  const handleInputClick = e => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  const onItemClick = option => {
    setSelectedDropValue(option);
  };

  const isSelected = option => {
    if (!selectedDropValue) {
      return false;
    }

    return selectedDropValue.value === option.value;
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
