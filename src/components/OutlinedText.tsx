// OutlinedText.tsx
import React, { useRef, useEffect, useState } from "react";
// useInheritedStyles.ts

interface InheritedStyles {
  fontSize: number | null;
  fontFamily: string | null;
  fontWeight: number | null;
  lineHeight: number | null;
}

const useInheritedStyles = () => {
  const textSizeRef = useRef<HTMLDivElement>(null);
  const [inheritedStyles, setInheritedStyles] = useState<InheritedStyles>({
    fontSize: null,
    fontFamily: null,
    fontWeight: null,
    lineHeight: null,
  });

  useEffect(() => {
    if (textSizeRef.current) {
      const computedStyles = getComputedStyle(textSizeRef.current);
      const fontSize = parseFloat(computedStyles.fontSize);
      const fontFamily = computedStyles.fontFamily;
      const fontWeight = parseFloat(computedStyles.fontWeight);
      const lineHeight = parseFloat(computedStyles.lineHeight);

      setInheritedStyles({ fontSize, fontFamily, fontWeight, lineHeight });
    }
  }, []);

  return { textSizeRef, inheritedStyles };
};

interface OutlinedTextProps {
  text?: string;
  className?: string;
  strokeWidth?: number;
}

const OutlinedText: React.FC<OutlinedTextProps> = ({
  text,
  className,
  strokeWidth,
}) => {
  const { textSizeRef, inheritedStyles } = useInheritedStyles();

  const [bbox, setBbox] = useState({ width: 0, height: 0 });
  const textRef = useRef<SVGTextElement>(null);

  useEffect(() => {
    if (textRef.current) {
      setBbox(textRef.current.getBBox());
    }
  }, [text, inheritedStyles]);

  const svgHeight = inheritedStyles.lineHeight || bbox.height;
  const yValue = inheritedStyles.fontSize ? inheritedStyles.fontSize * 1.1 : 0;

  return (
    <>
      <div ref={textSizeRef} className="hidden"></div>
      {text &&
        inheritedStyles.fontSize &&
        inheritedStyles.fontFamily &&
        inheritedStyles.fontWeight && (
          <svg width={bbox.width} height={svgHeight} className={className}>
            <text
              ref={textRef}
              fontSize={inheritedStyles.fontSize}
              fontFamily={inheritedStyles.fontFamily}
              fontWeight={inheritedStyles.fontWeight}
              fill="white"
              stroke="black"
              strokeWidth={strokeWidth ?? 1}
              textAnchor="middle"
              dominantBaseline="ideographic"
              x="50%"
              y={yValue}
            >
              {text}
            </text>
          </svg>
        )}
    </>
  );
};

export default OutlinedText;
