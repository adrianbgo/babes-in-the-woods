import type { NextApiRequest, NextApiResponse } from 'next';
import type { Server as IOServer } from 'socket.io';
import { Server } from 'socket.io';
import type { Server as HTTPServer } from 'http';
import type { Socket as NetSocket } from 'net';

interface SocketServer extends HTTPServer {
    io?: IOServer | undefined;
}

interface SocketWithIO extends NetSocket {
    server: SocketServer;
}

interface NextApiResponseWithSocket extends NextApiResponse {
    socket: SocketWithIO;

}

const SocketHandler = (req: NextApiRequest, res: NextApiResponseWithSocket) => {
    const { option } = req.query;
    // console.log(res.socket.server.io?.sockets.adapter.rooms);
    switch (option) {
        case "connection":
            if (res.socket.server.io) {
                console.info('socket.io already running, skipping')
            } else {
                const io = new Server(res.socket.server);
                res.socket.server.io = io;

                io.on("connection", (socket) => {
                    socket.on('join-room', (room) => {
                        socket.join(room);
                    })
                })
            }
            break;
        case "room":
            console.log('room');
            if (res.socket.server.io) {
                const { room } = req.query;
                const allRooms = Array.from(res.socket.server.io.sockets.adapter.rooms);
                // console.log(allRooms);
                console.log(room);
                const activeRooms = allRooms.filter((room) => !room[1].has(room[0]));
                console.log("active rooms: ", activeRooms);
                const activeRoomNames = activeRooms.map((el) => el[0]);
                console.log("Active room names: ", activeRoomNames)
                const there_is = activeRoomNames.findIndex((el) => el == room) == -1 ? false : true;
                console.log('here');
                console.log(there_is);
                res.status(200).json({ thereIs: there_is });
            }
            break;
    }
    res.end();
}

export default SocketHandler;