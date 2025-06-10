const WebSocket = require('ws');
const jwt = require('jsonwebtoken');

function setupWebSocket(server) {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws, req) => {
    // Extract court ID from URL
    const courtId = req.url.split('/').pop();
    
    // Join court room
    ws.courtId = courtId;
    ws.join(`court-${courtId}`);

    // Handle messages
    ws.on('message', (message) => {
      try {
        const data = JSON.parse(message);
        
        // Handle different message types
        switch (data.type) {
          case 'selectSlot':
            // Broadcast slot selection to all clients in the court room
            wss.to(`court-${courtId}`).emit('slotUpdate', {
              slotId: data.slotId,
              status: 'being-selected',
              selectedBy: data.userName
            });
            break;
            
          case 'releaseSlot':
            // Broadcast slot release to all clients in the court room
            wss.to(`court-${courtId}`).emit('slotUpdate', {
              slotId: data.slotId,
              status: 'available'
            });
            break;
            
          case 'bookSlot':
            // Broadcast slot booking to all clients in the court room
            wss.to(`court-${courtId}`).emit('slotUpdate', {
              slotId: data.slotId,
              status: 'booked'
            });
            break;
        }
      } catch (error) {
        console.error('WebSocket message error:', error);
      }
    });

    // Handle disconnection
    ws.on('close', () => {
      ws.leave(`court-${courtId}`);
    });
  });

  // Make WebSocket server available to the app
  server.set('io', wss);
}

module.exports = setupWebSocket; 