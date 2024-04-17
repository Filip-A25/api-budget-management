require("dotenv").config();

const getFormattedEmail = (email) => {
    let trimmedEmail = email.replace(/\s/g, "");
    if (!process.env.EMAIL_REGEXP.test(trimmedEmail)) return;
    else return trimmedEmail;
}

const getFormattedName = (trName) => {
    let trimmedName = trName.replace(/\s/g, "");
    if (trimmedName < 1 || trimmedName > 120) return;
    else return trimmedName;
}

module.exports = {getFormattedEmail, getFormattedName};