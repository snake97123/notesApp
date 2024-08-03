const Trash = ({ width = 24, height = 24, fill = "black" }) => {
  return (
    <svg
      width={width}
      height={height}
      // (x, y, width, height) 特別理由がなければwidthとheightと同じにする。
      viewBox="0 0 24 24"
      fill="none"
      // 他のXMLベースの文書で正しく解釈されるために使用される。
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 6h18M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Trash;
