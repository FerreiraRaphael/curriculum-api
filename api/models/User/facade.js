import Model from "../../lib/facade";
import userSchema from "./schema";

class UserModel extends Model {}

export default new UserModel(userSchema);
