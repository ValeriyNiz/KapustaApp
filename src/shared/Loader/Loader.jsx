import { ThreeDots } from 'react-loader-spinner';
import PropTypes from 'prop-types';

export default function Loader({ color = '#52555fc8', height = '30' }) {
  return (
    <>
      <ThreeDots
        height={height}
        width="50"
        radius="5"
        color={color}
        ariaLabel="three-dots-loading"
        wrapperStyle={{ justifyContent: 'center' }}
        wrapperClassName=""
        visible={true}
      />
    </>
  );
};

Loader.propTypes = {
  color: PropTypes.string,
  height: PropTypes.string,
};
