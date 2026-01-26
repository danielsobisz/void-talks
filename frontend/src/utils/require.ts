export const requireValue = <T>(node?: T) => {
  if (!node) throw new Error("Required value is null or undefined");
  return node;
};
