import { useSelector } from 'react-redux';

import css from './UserMenu.module.css';
import Sprite from '../../images/sprite.svg';
import Modal from '../../shared/Modal/Modal';
import { useState } from 'react';
import { getUserName } from 'redux/auth/auth-selector';
import { logOut } from 'redux/auth/auth-operations';

const UserMenu = () => {
  const userName = useSelector(getUserName);
  const avatarName = userName?.slice(0, 1).toLocaleUpperCase();

  const [isModalActive, setIsModalActive] = useState(false);

  const toggleModal = () => {
    setIsModalActive(!isModalActive);
  };

  const handleOpenModal = () => {
    setIsModalActive(true);
  };

  return (
    <div className={css.userMenu}>
      <Modal action={logOut} setActive={toggleModal} active={isModalActive}>
        Do you really want to leave?
      </Modal>
      <p className={css.avatarName}>{avatarName || 'U'}</p>
      <p className={css.userName}>
        {userName || 'User Name'} <span className={css.userLine}></span>
      </p>

      <button
        className={css.userButton}
        onClick={handleOpenModal}
        type="button"
      >
        Exit
      </button>

      <button
        className={css.iconButton}
        type="button"
        onClick={handleOpenModal}
      >
        <svg className={css.logoutIcon} width={16} height={16}>
          <use href={`${Sprite}#icon-logout`}></use>
        </svg>
      </button>
    </div>
  );
};

export default UserMenu;
