다소 자극적으로 제목을 썼지만, 저는 사실 Styled Components를 매우 좋아합니다. CSS in JS 만큼 CSS를 작성할 때 직관적인 방법은 없다고 생각하기 때문이지요.

그러나, 최근 개발자 모드를 켜고 놀라운 사실을 하나 발견했습니다.

> ☹️ Styled Components에서 props가 다르면 부여되는 class 또한 다릅니다.

이러한 특징이 성능에 미치는 영향은 어떨지 궁금해졌고, 직접 실험을 구성해보았습니다.

이번 글에서는 이 실험에 대해 이야기해보려 합니다.

---

## 실험 전 고민들

어떤 값들을 props로 넘겨줄지 고민해보았습니다.

성능에 영향을 미칠 정도로 class가 자주 바뀌려면, props 또한 자주 바뀌어야 합니다.

이러한 특징을 가장 잘 반영하면서 실제로 자주 사용되는 컴포넌트가 있는데, 바로 Color picker입니다.

실험을 단순화시키기 위해 hue값만 변화시키기로 결정했습니다.

---

## 실험 환경

![실험 환경](https://velog.velcdn.com/images/gs18004/post/547b615b-0986-42c3-8882-e40a8012cdd5/image.png)

기기: MacBook Pro (M1 Pro + 16GB RAM)

브라우저: Chrome

기타: 개발자도구에서 CPU 6x slowdown

우리나라에서는 많은 사람들이 최신 기기를 사용하지만, 전세계적으로 보면 그렇지 않습니다.

글로벌 대상의 서비스를 개발할 때에는 성능이 비교적 아쉬운 기기들에서도 원활한 구동이 가능하게 해야 하므로, 성능을 고려해야 할 상황이 생기게 됩니다.

이러한 극단적인 상황을 가정하여, CPU에 6x slowdown 제한을 설정했습니다.

---

## 실험군

Styled Components를 사용하여 Color 컴포넌트에 hue 값을 prop으로 넘겨주었습니다.

```tsx
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

const Color = styled.div<{
  hue: number;
}>`
  width: 200px;
  height: 200px;
  border-radius: 100px;
  background: ${({ hue }) => `hsl(${hue}, 100%, 50%)`};
  margin-bottom: 32px;
`;

// ...
```

---

## 대조군

CSS Modules를 사용하고, inline으로 hue 값을 설정해주었습니다.

```tsx
import { useState } from "react";
import styles from "./OpacityPicker.module.css";

const ModulesOpacityPicker = () => {
  const [hue, setHue] = useState(1);
  const handleHueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHue(Number(e.target.value));
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Inline CSS</h1>
      <div
        className={styles.color}
        style={{
          background: `hsl(${hue}, 100%, 50%)`,
        }}
      />
      <input
        className={styles.slider}
        type="range"
        min="0"
        max="360"
        step="0.01"
        value={hue}
        onChange={handleHueChange}
      />
    </div>
  );
};

export default ModulesOpacityPicker;
```

---

## 실험 결과

### 실험군

![실험군](https://velog.velcdn.com/images/gs18004/post/32b157bc-fb77-4e08-a495-eacc3b2fbc04/image.gif)

Styled Components를 사용한 경우, 뚝뚝 끊기는 것을 볼 수 있습니다. 이는 심각한 사용자 경험 저하로 이어질 수 있는 문제입니다.

![개발자도구](https://velog.velcdn.com/images/gs18004/post/aae941f2-282a-46cf-ab3f-a81209fde354/image.gif)

개발자도구에서 확인해 보면, class가 계속 바뀌는 것을 볼 수 있습니다.

### 대조군

![대조군](https://velog.velcdn.com/images/gs18004/post/68627134-6f7c-42a2-add0-d00cbba19c56/image.gif)

반면 Inline CSS를 사용한 경우, 부드럽게 잘 작동합니다.

---

## 결론

Styled Components를 사용하는 상황에서 props가 너무 자주 바뀐다면 이는 성능 저하로 이어질 수 있으므로 유의해야 합니다.

Inline CSS는 일반적으로 권장되지 않는 방법이지만, 이런 경우에 한해서는 사용하는 것이 바람직합니다.

CSS in JS는 편리하고 직관적이지만, 최근 여러 성능 이슈가 대두되고 있습니다. CSS Modules와 같은 좋은 대안도 경험해보시기를 추천드립니다.

[직접 실험해보기](https://styledcomponents-is-bad.vercel.app)
