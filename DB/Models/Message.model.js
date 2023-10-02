import mongoose, {Schema,Types,model} from 'mongoose';

const MessageSchema = new Schema ({

    message:{
        type:String,
        require:true,
    },
    receiverId:{
        type:Types.ObjectId,
        ref:'User',
        require:true,
    },
},{
    timestamps:true
});

const MessageModel = mongoose.model.Message || model('Message',MessageSchema);

export default MessageModel;