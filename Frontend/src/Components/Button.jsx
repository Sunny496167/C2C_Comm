import PropTypes from "prop-types";

const Button = ({ text = "Click Me", gradient = "from-purple-600 to-blue-500", focusGradient = "ring-purple-300" }) => {
  return (
    <button
      className={`relative text-white bg-gradient-to-br ${gradient} 
      hover:bg-gradient-to-bl focus:ring-4 focus:outline-none ${focusGradient} 
      dark:focus:ring-opacity-50 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2
      active:border-2 active:border-opacity-40 focus:border-2 focus:border-opacity-40`}
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  gradient: PropTypes.string,
  focusGradient: PropTypes.string,
};

export default Button;
