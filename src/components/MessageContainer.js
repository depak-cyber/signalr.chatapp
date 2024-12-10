const MessageContainer = ({ messages }) => {
 
    console.log(messages);
    return (
        
        <>
           {messages && messages.map((msg, index) => (
                <table  className="table table-striped table-bordered">
                    <tbody>
                        <tr key={index}>
                            <td>{msg.msg} - {msg.username}</td>
                        </tr>
                    </tbody>
                </table>
            ))}
        </>
    );
};

export default MessageContainer;


