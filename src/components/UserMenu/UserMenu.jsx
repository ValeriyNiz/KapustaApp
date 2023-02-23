import { useSelector } from 'react-redux';

import css from './UserMenu.module.css';
import Sprite from '../../images/sprite.svg';
import Modal from '../../shared/Modal/Modal';
import { useState } from 'react';

const UserMenu = () => {
  const userName = useSelector(state => state.user?.user?.email);
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
      <Modal setActive={toggleModal} active={isModalActive}>
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
