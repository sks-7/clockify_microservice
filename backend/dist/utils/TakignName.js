const getNameFromEmail = (email) => {
    const username = email.split("@")[0];
    return username.replace(/\d+/g, "");
};
export { getNameFromEmail };
