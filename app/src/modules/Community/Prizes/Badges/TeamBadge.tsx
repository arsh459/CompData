import { badgeTypes } from "@models/Prizes/Prizes";
import Svg, {
  Circle,
  Defs,
  LinearGradient,
  Path,
  Stop,
} from "react-native-svg";

interface Props {
  effect?: "spin" | "ripple" | "glow";
  badgeType: badgeTypes;
  color: {
    color1: string;
    color2: string;
  };
}

const TeamBadge: React.FC<Props> = ({ badgeType, effect, color }) => {
  return (
    <Svg className="w-full h-full" viewBox="-10 46 280 280" fill="none">
      <Path
        d="M229.558 93.612c-92.426-36.436-169.99-15.177-197.22.006-9.972 4.672-16.337 10.512-16.337 19.855.004 131.974 89.864 179.856 101.534 184.527 9.336 3.737 21.005 1.557 24.506 0 114.363-57.232 101.522-172.855 101.522-184.534 0-10.511-5.836-15.183-14.005-19.854z"
        fill={`url(#prefix__paint4_linear_${badgeType})`}
        stroke={`url(#prefix__paint5_linear_${badgeType})`}
        strokeWidth={2}
      />
      <Path
        d="M160.634 133.417C49.628 175.789 19.959 135.593 19 110.198c0 105.933 55.36 158.173 96.34 184.294-58.667-65.011 73.333-161.075 123.66-193l-33.791 13.785-44.575 18.14z"
        fill={`url(#prefix__paint6_linear_${badgeType})`}
        stroke={`url(#prefix__paint7_linear_${badgeType})`}
        strokeWidth={2}
      />
      <Path
        d="M100.492 197.764h-8.805l6.42-6.638h10.95l-4.994 5.12a4.998 4.998 0 01-3.571 1.518zM59.57 191.131h8.807l-6.42 6.637H51l4.994-5.12a4.995 4.995 0 013.576-1.517z"
        fill="#232323"
      />
      <Path
        d="M68.089 191.131H99.16l-6.824 6.635h-30.96l6.712-6.635zM69.227 186.763H59l4.03-4.193a6.7 6.7 0 014.837-2.078h7.44l-6.08 6.271zM86.268 180.492h10.231l-4.03 4.193a6.712 6.712 0 01-4.835 2.078h-7.441l6.075-6.271z"
        fill="#232323"
      />
      <Path
        d="M75.3 180.492h10.964l-6.075 6.271H69.225l6.075-6.271zM76.635 176.566h-7.577l4.031-4.06a6.824 6.824 0 012.217-1.491 6.826 6.826 0 012.62-.523h7.439l-4.2 4.2a6.4 6.4 0 01-4.53 1.874zM90.138 202.26h10.232l-4.031 4.194a6.713 6.713 0 01-4.827 2.078h-7.453l6.08-6.272zM73.099 208.532H62.867l4.03-4.193a6.697 6.697 0 014.835-2.079h7.441l-6.075 6.272z"
        fill="#232323"
      />
      <Path
        d="M84.06 208.53H73.097l6.074-6.27h10.964l-6.075 6.27zM83.424 212.616h7.58l-4.03 4.06a6.802 6.802 0 01-4.835 2.014H74.7l4.2-4.202a6.409 6.409 0 014.525-1.872z"
        fill="#232323"
      />
      <Circle
        cx={80}
        cy={194.492}
        r={34.25}
        stroke={`url(#prefix__paint8_linear_${badgeType})`}
        strokeWidth={1.5}
      />
      <Path
        d="M119.731 297.492c-24.452-39.477-22.23-87.977 122.269-194M124.381 297.492c-23.722-39.07-21.566-87.07 118.619-192M115.644 297.492c-24.27-39.477-22.064-87.977 121.356-194M16.385 111.761C33.207 152.968 72.1 174.868 236 98.413M16.767 108.856c17.012 40.874 55.866 62.791 218.512-11.78M16.612 104.712c17.349 40.377 56.193 62.352 216.981-9.198"
        stroke={color.color2}
        strokeWidth={0.3}
      />
      <Path
        d="M62.52 103.553l3.88-.485 3.873 10.039.046-.005 2.082-10.784 3.31-.413 4.684 10.216.045-.006 1.387-10.975 3.606-.45-2.705 16.748-3.172.397-4.958-10.738-.046.005-2.163 11.628-3.058.383-6.812-15.56zm24.756 2.052l3.423-.428 1.386 11.092-3.423.428-1.386-11.092zm-.71-3.457a1.91 1.91 0 01.396-1.464 1.947 1.947 0 011.341-.77 1.874 1.874 0 011.466.419c.444.331.7.771.768 1.318a1.95 1.95 0 01-.417 1.49 1.91 1.91 0 01-1.32.744 1.984 1.984 0 01-1.487-.394 1.986 1.986 0 01-.747-1.343zm6.593 2.722l3.286-.411.188 1.507.046-.006c.08-.226.205-.458.377-.696.17-.238.383-.457.636-.659s.548-.378.884-.528a3.93 3.93 0 011.121-.302c.868-.109 1.585-.059 2.151.148a2.904 2.904 0 011.37.942c.363.433.638.963.824 1.589.186.626.326 1.311.419 2.057l.765 6.116-3.424.428-.678-5.432c-.04-.319-.097-.645-.169-.976a2.768 2.768 0 00-.325-.932 1.537 1.537 0 00-.613-.642c-.251-.154-.597-.204-1.039-.149-.44.055-.788.184-1.041.385a1.63 1.63 0 00-.56.719 2.677 2.677 0 00-.162.925c-.004.34.017.693.063 1.058l.69 5.523-3.423.428-1.386-11.092zm13.105-1.638l3.286-.41.188 1.506.046-.006c.08-.226.206-.458.377-.696a3.37 3.37 0 01.636-.659c.253-.201.548-.377.884-.527a3.94 3.94 0 011.121-.303c.868-.108 1.585-.059 2.151.149a2.909 2.909 0 011.37.941c.363.434.638.963.824 1.589.186.626.326 1.312.419 2.057l.765 6.116-3.424.428-.678-5.431c-.04-.32-.096-.645-.169-.976a2.781 2.781 0 00-.325-.933 1.531 1.531 0 00-.613-.642c-.251-.154-.597-.203-1.039-.148-.441.055-.788.183-1.041.385a1.623 1.623 0 00-.559.719 2.667 2.667 0 00-.163.924c-.004.34.017.693.063 1.058l.69 5.523-3.423.428-1.386-11.092zm13.151-1.643l3.423-.428 1.386 11.092-3.423.428-1.386-11.092zm-.711-3.457a1.91 1.91 0 01.397-1.464 1.947 1.947 0 011.341-.77 1.873 1.873 0 011.466.42c.443.33.699.77.767 1.317a1.945 1.945 0 01-.416 1.49 1.909 1.909 0 01-1.321.744 1.985 1.985 0 01-1.486-.394 1.988 1.988 0 01-.748-1.343zm6.593 2.722l3.287-.411.188 1.507.046-.006c.08-.226.205-.458.376-.696.171-.238.384-.458.636-.659.253-.202.548-.378.885-.528.337-.15.71-.25 1.121-.302.867-.109 1.584-.06 2.151.148a2.899 2.899 0 011.369.942c.364.433.638.963.825 1.589.186.625.326 1.311.419 2.057l.764 6.116-3.423.428-.679-5.432c-.04-.319-.096-.645-.168-.976a2.768 2.768 0 00-.325-.932 1.533 1.533 0 00-.614-.642c-.251-.154-.597-.204-1.038-.149-.441.055-.788.184-1.041.385a1.622 1.622 0 00-.559.719 2.67 2.67 0 00-.163.924c-.004.341.017.694.063 1.059l.69 5.523-3.424.428-1.386-11.092zm26.014 7.064c.262 2.1-.071 3.756-1.001 4.969-.913 1.227-2.45 1.975-4.611 2.245-.989.124-1.977.132-2.964.023a6.538 6.538 0 01-2.807-.947l1.541-3.067a7.323 7.323 0 001.797.842 4.838 4.838 0 001.988.145c1.05-.131 1.786-.485 2.209-1.064.439-.564.609-1.242.51-2.034l-.134-1.072-.045.005a3.324 3.324 0 01-1.341 1.327c-.552.285-1.086.46-1.604.525-.821.102-1.584.059-2.288-.132a5.349 5.349 0 01-1.882-.97 5.536 5.536 0 01-1.324-1.689c-.346-.667-.571-1.419-.676-2.256a6.932 6.932 0 01.074-2.188 6.226 6.226 0 01.773-1.974 5.068 5.068 0 011.438-1.478c.582-.413 1.269-.668 2.06-.767a5.13 5.13 0 011.344-.006c.424.055.806.146 1.147.274.34.127.638.283.892.468.253.17.461.344.622.525l.046-.006-.183-1.46 3.15-.394 1.269 10.156zm-9.211-3.601c.045.365.157.707.336 1.024.177.303.403.568.679.796.289.212.603.373.941.485.354.111.729.141 1.124.092a2.591 2.591 0 001.045-.363c.315-.193.58-.427.793-.701.226-.291.388-.605.485-.942a2.76 2.76 0 00-.26-2.077 2.478 2.478 0 00-.702-.793 2.734 2.734 0 00-.944-.507 2.58 2.58 0 00-1.101-.095c-.396.05-.751.171-1.067.365-.3.193-.564.434-.79.725a2.628 2.628 0 00-.462.939 2.59 2.59 0 00-.077 1.052z"
        fill={`url(#prefix__paint9_linear_${badgeType})`}
      />
      <Path
        d="M152.229 237.357l-3.958 6.1-4.168-2.704 10.975-16.912 4.167 2.705-3.958 6.1 17.213 11.17-3.057 4.711-17.214-11.17zm29.706-13.635a8.614 8.614 0 01.36 4.139 9.81 9.81 0 01-1.479 3.933 11.191 11.191 0 01-2.62 2.848 9.559 9.559 0 01-3.226 1.598 9.044 9.044 0 01-3.563.134c-1.221-.192-2.415-.666-3.582-1.424-1.168-.758-2.088-1.655-2.76-2.692a8.626 8.626 0 01-1.299-3.289 9.24 9.24 0 01.115-3.616 11.18 11.18 0 011.534-3.554c.679-1.047 1.475-1.875 2.386-2.486a6.812 6.812 0 012.981-1.155c1.056-.173 2.162-.113 3.317.179 1.156.292 2.317.816 3.485 1.574l1.419.921-6.82 10.509c.984.381 1.933.439 2.848.175.896-.278 1.631-.859 2.206-1.745.483-.745.727-1.474.731-2.186a6.197 6.197 0 00-.416-2.202l4.383-1.661zm-8.952-.359c-.752-.516-1.569-.689-2.453-.519-.883.171-1.592.669-2.128 1.494-.327.504-.533.999-.621 1.486a4.018 4.018 0 00-.012 1.408c.072.419.226.819.464 1.203.231.35.521.652.87.907l3.88-5.979zm17.862-11.851l-.04.061a5.059 5.059 0 01.378 3.121 8.088 8.088 0 01-1.191 2.96 7.92 7.92 0 01-1.595 1.797 5.729 5.729 0 01-1.924 1.112 4.953 4.953 0 01-2.164.227c-.746-.084-1.492-.368-2.237-.851-.846-.549-1.462-1.164-1.85-1.845a5.251 5.251 0 01-.627-2.209 7.414 7.414 0 01.32-2.41c.223-.828.519-1.637.888-2.427a24.8 24.8 0 011.25-2.323c.463-.757.897-1.449 1.302-2.073-.805-.522-1.629-.642-2.471-.358-.849.25-1.528.767-2.037 1.553a5.245 5.245 0 00-.85 2.367c-.09.8-.02 1.617.21 2.453l-4.044.809a9.707 9.707 0 01.169-4.096 12.331 12.331 0 011.67-3.895c.862-1.328 1.738-2.305 2.629-2.928.884-.657 1.812-1.028 2.782-1.113.984-.105 2.015.048 3.092.461 1.056.4 2.199.998 3.427 1.795l7.459 4.84-2.704 4.168-1.842-1.196zm-5.316-1.861c-.222.342-.483.788-.782 1.338a7.318 7.318 0 00-.719 1.636 4.135 4.135 0 00-.149 1.62c.072.505.36.921.864 1.247.543.353 1.096.383 1.658.09a3.472 3.472 0 001.334-1.195c.287-.443.501-.905.642-1.386.153-.501.224-.985.211-1.451a2.791 2.791 0 00-.355-1.303c-.212-.424-.549-.786-1.012-1.086l-.967-.627-.725 1.117zm-2.97-13.477l2.822-4.348 1.993 1.293.039-.06a4.355 4.355 0 01-.454-1.153 5.227 5.227 0 01-.147-1.426c.013-.506.1-1.036.26-1.591a6.128 6.128 0 01.768-1.647c.666-1.027 1.466-1.796 2.398-2.306.945-.531 2.002-.704 3.169-.519-.607-1.137-.87-2.209-.789-3.215.081-1.007.474-2.053 1.18-3.141.64-.986 1.346-1.7 2.12-2.143.766-.475 1.565-.715 2.397-.718.825-.037 1.683.119 2.572.467.883.315 1.767.76 2.653 1.335l8.667 5.624-2.939 4.53-8.547-5.546c-.684-.444-1.366-.672-2.045-.683-.686-.045-1.271.305-1.755 1.05-.339.523-.536 1.025-.59 1.505-.061.447-.012.879.146 1.296.171.398.426.777.763 1.139.35.342.747.657 1.19.944l7.761 5.037-2.94 4.529-7.761-5.036c-.261-.17-.59-.369-.986-.597a4.578 4.578 0 00-1.224-.494 2.418 2.418 0 00-1.268.036c-.411.105-.787.419-1.126.942-.379.584-.575 1.129-.589 1.635a2.54 2.54 0 00.297 1.394c.224.404.539.779.942 1.127.404.348.847.679 1.331.992l7.308 4.743-2.94 4.529-14.676-9.524z"
        fill={`url(#prefix__paint10_linear_${badgeType})`}
      />
      <Defs>
        <LinearGradient
          id={`prefix__paint4_linear_${badgeType}`}
          x1={238.297}
          y1={97.007}
          x2={27.403}
          y2={212.429}
          gradientUnits="userSpaceOnUse"
        >
          <Stop />
          <Stop offset={0.576} stopColor="#1C1C1C" stopOpacity={0.22} />
          <Stop offset={0.943} />
        </LinearGradient>
        <LinearGradient
          id={`prefix__paint5_linear_${badgeType}`}
          x1={256.5}
          y1={122.992}
          x2={-6}
          y2={210}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor={color.color2} />
          <Stop offset={0.438} stopColor={color.color1} />
          <Stop offset={1} stopColor={color.color2} />
        </LinearGradient>
        <LinearGradient
          id={`prefix__paint6_linear_${badgeType}`}
          x1={31.222}
          y1={227.74}
          x2={264.498}
          y2={94.631}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0.067} stopColor={color.color2} />
          <Stop offset={0.407} stopColor={color.color1} />
          <Stop offset={0.75} stopColor={color.color2} />
        </LinearGradient>
        <LinearGradient
          id={`prefix__paint7_linear_${badgeType}`}
          x1={229.654}
          y1={107.296}
          x2={29.604}
          y2={221.08}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor={color.color2} />
          <Stop offset={0.601} stopColor={color.color1} stopOpacity={0.31} />
          <Stop offset={1} stopColor={color.color2} />
        </LinearGradient>
        <LinearGradient
          id={`prefix__paint8_linear_${badgeType}`}
          x1={38}
          y1={244.492}
          x2={115}
          y2={178.992}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor={color.color2} stopOpacity={0.72} />
          <Stop offset={0.58} stopColor={color.color1} />
          <Stop offset={1} stopColor={color.color2} />
        </LinearGradient>
        <LinearGradient
          id={`prefix__paint9_linear_${badgeType}`}
          x1={53}
          y1={116.5}
          x2={163}
          y2={104}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor={color.color2} />
          <Stop offset={0.532} stopColor={color.color1} />
          <Stop offset={1} stopColor={color.color2} />
        </LinearGradient>
        <LinearGradient
          id={`prefix__paint10_linear_${badgeType}`}
          x1={156}
          y1={251}
          x2={217.5}
          y2={166}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor={color.color2} />
          <Stop offset={0.468} stopColor={color.color1} />
          <Stop offset={1} stopColor={color.color2} />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default TeamBadge;
