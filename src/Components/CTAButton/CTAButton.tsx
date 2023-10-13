import React, { FC } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

type ButtonType = "primary" | "secondary";

interface CTAButtonProps {
  title: string;
  variant: ButtonType;
  onPress: () => void;
}

export const CTAButton: FC<CTAButtonProps> = ({ title, onPress, variant }) => {
  const containerStyle =
    variant === "primary" ? styles.containerPrimary : styles.containerSecondary;

  const textStyle =
    variant === "primary" ? styles.textPrimary : styles.textSecondary;

  return (
    <TouchableOpacity onPress={onPress} style={containerStyle}>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerPrimary: {
    height: 60,
    backgroundColor: "rgba(155,10,255,0.5)",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  containerSecondary: {
    height: 60,
    borderRadius: 12,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  textPrimary: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
  textSecondary: {
    fontSize: 15,
    fontWeight: "bold",
    color: "black",
  },
});
