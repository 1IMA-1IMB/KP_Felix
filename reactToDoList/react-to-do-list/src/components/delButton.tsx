interface Props {
  children: string;
  onClick: () => void;
}

const ButtonDel = ({ onClick, children }: Props) => {
  return (
    <button className="dbutton" onClick={onClick}>
      {children}
    </button>
  );
};

export default ButtonDel;
