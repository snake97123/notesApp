import AddButton from "./AddButton";
import colors from "../assets/colors.json";
import Color from "./Color";

const Controls = () => {
  return (
    <div className="controls">
      <AddButton />
      {colors.map((color) => {
        return <Color key={color.id} color={color} />;
      })}
    </div>
  );
};

export default Controls;
