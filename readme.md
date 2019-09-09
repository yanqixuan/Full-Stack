# wexin PC版全栈项目

## 向特定的socketid 发送信息
如何获得这个 socketId ，就是生成一个哈希数组，key为username，值为socket.id，这样就可以通过用户名获取对应的id，进而可以向特定client推送消息。
io.sockets.connected[socketid].emit();