import css from './Header.module.css';
import Sprite from '../../images/sprite.svg';
import UserMenu from '../UserMenu/UserMenu';
import { getIsLoggedIn } from 'redux/auth/auth-selector';

import { useSelector } from 'react-redux';

export const Header = () => {
  const isLogin = useSelector(getIsLoggedIn);

  return (
    <header className={css.header}>
      <div className={css.headerContainer}>
        <button className={css.headerButton} type="button">
          <svg className={css.logoIcon} width={90} height={31}>
            <use href={`${Sprite}#icon-logo`}></use>
          </svg>
        </button>
        {isLogin && <UserMenu />}
      </div>
    </header>
  );
};
