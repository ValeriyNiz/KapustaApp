import css from './Header.module.css';
import Sprite from '../../images/cabagge/sprite.svg';
import UserMenu from '../UserMenu/UserMenu';
import { getIsLoggedIn } from 'redux/auth/auth-selector';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export const Header = () => {
  const isLogin = useSelector(getIsLoggedIn);

  return (
    <header className={css.header}>
      <div className={css.headerContainer}>
        <Link className={css.headerButton} to="/">
          <svg className={css.logoIcon} width={90} height={31}>
            <use href={`${Sprite}#icon-logo`}></use>
          </svg>
        </Link>
        {isLogin && <UserMenu />}
      </div>
    </header>
  );
};
