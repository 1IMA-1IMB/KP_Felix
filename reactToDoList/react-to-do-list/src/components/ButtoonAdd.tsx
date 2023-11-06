interface Props {
  onClick: () => void;
  children: string;
}

const ButtoonAdd = ({ onClick, children }: Props) => {
  return (
    <button className="abutton" type="button" onClick={onClick}>
      {children}
    </button>
  );
};

export default ButtoonAdd;
