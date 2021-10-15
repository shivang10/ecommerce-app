import React from "react";

import {MessageBarInterface} from "./MessageBarInterface";

const MessageBar: React.FC<MessageBarInterface> = ({responseType, messageType}) => {

    if (responseType === "") {
        return null;
    }

    if (responseType === "loading") {
        return (
            <div>
                {messageType}
            </div>
        );
    }

    if (responseType === "warning") {
        return (
            <div>
                {messageType}
            </div>
        );
    }

    if (responseType === "error") {
        return (
            <div>
                {messageType}
            </div>
        );
    }

    return (
        <div>
            {messageType}
        </div>
    );
};

export default MessageBar;
