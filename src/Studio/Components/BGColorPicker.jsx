import { useContext } from "react";
import { ChromePicker } from "react-color";
import { ThemeContext } from "../studio";


export function BGColorPicker({ type }) {
  const context = useContext(ThemeContext);
  console.log(context[0]);
  const handleChangeComplete = (color) => {
    const theme = { ...context[0] };
    theme[type] = color.hex;
    context[1](theme);
  };
  return (
    <ChromePicker color={context[0]?.[type]} onChange={handleChangeComplete} />
  );
}
