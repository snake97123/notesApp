const Plus = ({ size = "24", color = "#FFFFFF" }) => {
  return (
    <svg
      width={size}
      height={size}
      stroke={color}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path strokeLinecap="round" d="M18 12H6M12 6v12"></path>
    </svg>
  );
};

export default Plus;
