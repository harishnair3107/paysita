
export const getInitials = (mobile) => {
  if (typeof mobile !== "string" || mobile.length < 2) {
    return "U";
  }
  return mobile.slice(-2);
};
  