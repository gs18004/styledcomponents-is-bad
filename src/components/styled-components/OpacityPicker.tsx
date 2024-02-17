import { useState } from "react";
import styled from "styled-components";

const ScOpacityPicker = () => {
  const [hue, setHue] = useState(1);
  const handleHueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHue(Number(e.target.value));
  };
  return (
    <Container>
      <Title>Styled Components</Title>
      <Color hue={hue} />
      <Slider
        type="range"
        min="0"
        max="360"
        step="0.01"
        value={hue}
        onChange={handleHueChange}
      />
    </Container>
  );
};

export default ScOpacityPicker;

const Container = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Title = styled.h1`
  width: 100%;
  color: #000;
  text-align: center;
  margin-bottom: 16px;
`;
const Color = styled.div<{
  hue: number;
}>`
  width: 200px;
  height: 200px;
  border-radius: 100px;
  background: ${({ hue }) => `hsl(${hue}, 100%, 50%)`};
  margin-bottom: 32px;
`;
const Slider = styled.input`
  width: 100%;
`;
