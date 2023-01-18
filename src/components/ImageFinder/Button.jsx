import PropTypes from 'prop-types';

const Button = ({ loadMore }) => (
    <button type="button" onClick={loadMore} className="Button">Load more</button>
)

Button.propTypes = {
    loadMore: PropTypes.func.isRequired,
}

export default Button;