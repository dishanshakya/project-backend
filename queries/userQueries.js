const checkEmailExists = 'SELECT * FROM Users where email=$1';
const getUserFromEmail = 'SELECT user_id FROM Users where email=$1';
const getUserFromId = 'select * from users where user_id = $1'
const changePassword = 'update users set password = $1 where user_id = $2'
const changeProfilePic = 'update users set profile_pic_src = $1 where user_id = $2'

module.exports = {
   checkEmailExists,
   getUserFromEmail,
   getUserFromId,
   changePassword,
   changeProfilePic,
}