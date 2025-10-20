class HandleResult {
    success;
    data;
    messageList;

    constructor(success?: any, data?: any, messageList?: any) {
        this.success = success || false;
        this.data = data === undefined ? null : data;
        this.messageList = messageList || [];
    }
}

export default HandleResult;
