import {
  Avatar as ChakraAvatar,
  AvatarProps as ChakraAvatarProps, // Import the correct props type
  AvatarGroup as ChakraAvatarGroup,
} from "@chakra-ui/react";
import * as React from "react";

type ImageProps = React.ImgHTMLAttributes<HTMLImageElement>;

export interface AvatarProps extends ChakraAvatarProps { // Use ChakraAvatarProps
  name?: string;
  src?: string;
  srcSet?: string;
  loading?: ImageProps["loading"];
  icon?: React.ReactElement;
  fallback?: React.ReactNode;
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  function Avatar(props, ref) {
    const { name, src, srcSet, loading, icon, fallback, children, ...rest } = props;
    return (
      <ChakraAvatar ref={ref} name={name} src={src} {...rest}>
        {icon || fallback || <ChakraAvatar />}
        {src && <img src={src} srcSet={srcSet} loading={loading} alt={name} />}
        {children}
      </ChakraAvatar>
    );
  },
);

export const AvatarGroup = ChakraAvatarGroup;
