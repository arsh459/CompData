import Svg, { Path } from "react-native-svg";

interface Props {
  color?: string;
}

const Setting: React.FC<Props> = ({ color }) => {
  return (
    <Svg className="w-full h-full" viewBox="0 0 23 24" fill="none">
      <Path
        d="M11.431 15.379a3.318 3.318 0 100-6.637 3.318 3.318 0 000 6.637z"
        stroke={color ? color : "#FFF"}
        strokeWidth={1.5}
      />
      <Path
        d="M13.38 1.168C12.975 1 12.46 1 11.428 1c-1.03 0-1.546 0-1.952.168a2.212 2.212 0 00-1.198 1.198c-.102.247-.143.535-.158.955a1.788 1.788 0 01-.874 1.496 1.788 1.788 0 01-1.733.009c-.372-.197-.64-.305-.907-.34a2.212 2.212 0 00-1.635.437c-.347.269-.606.715-1.121 1.607-.516.893-.775 1.339-.831 1.776a2.212 2.212 0 00.438 1.635c.164.213.393.39.748.614.523.329.86.889.86 1.506s-.337 1.177-.86 1.504c-.355.224-.585.402-.748.615a2.211 2.211 0 00-.438 1.636c.058.435.315.882.83 1.775.516.893.774 1.338 1.122 1.607a2.21 2.21 0 001.636.438c.266-.035.534-.144.906-.34a1.788 1.788 0 011.733.008c.534.31.852.88.874 1.497.015.42.055.708.158.954a2.213 2.213 0 001.198 1.198c.406.168.921.168 1.952.168s1.546 0 1.952-.168a2.212 2.212 0 001.198-1.198c.102-.246.143-.534.158-.954.022-.617.34-1.188.874-1.497a1.788 1.788 0 011.733-.009c.372.197.64.306.906.341a2.211 2.211 0 001.636-.438c.349-.268.606-.714 1.122-1.607.515-.893.774-1.338.83-1.775a2.212 2.212 0 00-.438-1.636c-.163-.213-.392-.39-.747-.614a1.788 1.788 0 01-.86-1.505c0-.617.336-1.177.86-1.505.355-.224.585-.402.747-.615a2.214 2.214 0 00.438-1.635c-.057-.436-.315-.883-.83-1.776-.516-.892-.773-1.338-1.122-1.607a2.213 2.213 0 00-1.636-.438c-.265.036-.534.144-.907.34a1.789 1.789 0 01-1.732-.008 1.788 1.788 0 01-.874-1.496c-.015-.42-.055-.708-.158-.955a2.212 2.212 0 00-1.198-1.198z"
        stroke={color ? color : "#FFF"}
        strokeWidth={1.5}
      />
    </Svg>
  );
};

export default Setting;
