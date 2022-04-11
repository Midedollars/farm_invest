module.exports = {
    createUser: `
        INSERT INTO user_info(
        firstname,
        lastname,
        phonenumber,
        email,
        password,
        role,
        isverified
        ) 
        VALUES(?, ?, ?, ?, ?, ?, ?)
    `,
    fetchUserByEmail: `
        SELECT *
        FROM user_info
        WHERE email = ?
    `,
}
