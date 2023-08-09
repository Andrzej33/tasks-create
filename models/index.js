const {Contact} = require("./contact");
const {schemas} = require("./contact");
const {User,authSchemas}= require("./user");
const{Task,taskSchemas} = require("./task")



module.exports = {Contact,
schemas,User,authSchemas,Task,taskSchemas
}