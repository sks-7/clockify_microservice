const getNameFromEmail = (email: string): string => {
  const username = email.split("@")[0];
  return username.replace(/\d+/g, "");
};

export { getNameFromEmail };
