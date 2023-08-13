interface IconCloseProps {
  size?: string;
  color?: string;
  className?: string;
}

export const IconClose: React.FC<IconCloseProps> = ({
  size = "1em",
  color = "currentColor",
  className,
  ...props
}) => {
  return (
    <svg
      viewBox="0 0 512 512"
      fill={color}
      height={size}
      width={size}
      {...props}
    >
      <path d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z" />
    </svg>
  );
};
export const IconRightChevron: React.FC<IconCloseProps> = ({
  size = "1em",
  color = "currentColor",
  className,
  ...props
}) => {
  return (
    <svg
      className={className}
      viewBox="0 0 512 512"
      fill={color}
      height={size}
      width={size}
      {...props}
    >
      <path
        d="M51.707,185.343c-2.741,0-5.493-1.044-7.593-3.149c-4.194-4.194-4.194-10.981,0-15.175
			l74.352-74.347L44.114,18.32c-4.194-4.194-4.194-10.987,0-15.175c4.194-4.194,10.987-4.194,15.18,0l81.934,81.934
			c4.194,4.194,4.194,10.987,0,15.175l-81.934,81.939C57.201,184.293,54.454,185.343,51.707,185.343z"
      />
    </svg>
  );
};
