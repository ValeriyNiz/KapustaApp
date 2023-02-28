import Sprite from '../../images/currentPeriod.svg';
export const chooseIcon = category => {
  let icon;
  if (category === 'Products') {
    icon = `${Sprite}#icon-food`;
  } else if (category === 'Alcohol') {
    icon = `${Sprite}#icon-cocktail`;
  } else if (category === 'Entertainment') {
    icon = `${Sprite}#icon-kite`;
  } else if (category === 'Health') {
    icon = `${Sprite}#icon-hands`;
  } else if (category === 'Transport') {
    icon = `${Sprite}#icon-car`;
  } else if (category === 'Housing') {
    icon = `${Sprite}#icon-couch`;
  } else if (category === 'Technique') {
    icon = `${Sprite}#icon-tools`;
  } else if (category === 'Communal, communication') {
    icon = `${Sprite}#icon-invoice`;
  } else if (category === 'Sports, hobbies') {
    icon = `${Sprite}#icon-clay`;
  } else if (category === 'Education') {
    icon = `${Sprite}#icon-book`;
  } else if (category === 'Other') {
    icon = `${Sprite}#icon-ufo`;
  } else if (category === 'Salary') {
    icon = `${Sprite}#icon-salary`;
  } else if (category === 'Add. income') {
    icon = `${Sprite}#icon-income`;
  }
  return icon;
};
