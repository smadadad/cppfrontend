import {
  Avatar as ChakraAvatar,
  AvatarProps as ChakraAvatarProps,
  AvatarGroup as ChakraAvatarGroup,
} from "@chakra-ui/react";
import Image from "next/image"; // Added
import * as React from "react";

type ImageProps = React.ImgHTMLAttributes<HTMLImageElement>;

export interface AvatarProps extends ChakraAvatarProps {
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
        {src && (
          <Image
            src={src}
            alt={name || "Avatar"}
            width={40} // Required by next/image; adjust based on your design
            height={40} // Required by next/image; adjust based on your design
            {...(srcSet ? { srcSet } : {})}
            loading={loading}
          />
        )}
        {children}
      </ChakraAvatar>
    );
  },
);

export const AvatarGroup = ChakraAvatarGroup;
