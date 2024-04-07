import { useEffect, useState } from "react";
import { io } from 'socket.io-client';

const SocketComponent = () => {
    const [message, setMessage] = useState<string>('');

    const SERVER = process.env['SERVER_HOST'];

    useEffect(() => {
        // Conecta al servidor de Socket.IO
        const socket = io(`${SERVER}`); // Asegúrate de usar la URL y el puerto correctos de tu servidor
    
        // Escucha por mensajes de tipo 'status' enviados por el servidor
        socket.on('status', (data: string) => {
          setMessage(data);
        });
    
        // Limpieza al desmontar el componente
        return () => {
          socket.disconnect();
          return void(0); // Asegura que la función retorna `void`
        };
      }, []);

      return (
        <div>
          <h1>Socket aqui:</h1>
          {/* Muestra el mensaje recibido del servidor */}
          <p>{message}</p>
        </div>
      );
};

export default SocketComponent;
