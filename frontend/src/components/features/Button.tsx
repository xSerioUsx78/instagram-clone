import Spin from "./animation/Spin";

const Button = ({
  className,
  text,
  type,
  loading,
  symbol = <></>,
  ...rest
}: any) => {
  return loading ? (
    <button
      type={type}
      className={`${className} cursor-not-allowed inline-flex items-center opacity-75`}
      disabled
      {...rest}
    >
      {symbol}
      <Spin />
      Processing
    </button>
  ) : (
    <button type={type} className={className} {...rest}>
      {symbol}
      {text}
    </button>
  );
};

export default Button;
