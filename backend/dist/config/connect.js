import mongoose from "mongoose";
const connect = async () => {
    return mongoose.connect(`${process.env.DB_URL}`);
};
export default connect;
