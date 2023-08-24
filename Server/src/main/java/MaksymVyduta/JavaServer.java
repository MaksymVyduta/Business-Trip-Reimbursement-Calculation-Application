package MaksymVyduta;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.SneakyThrows;

import java.io.*;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.Date;

public class JavaServer {
    private static final ObjectMapper objectMapper = new ObjectMapper();
    private static final Limits adminLimits = new Limits();

    public static void main(String[] args) {
        int port = 8080;

        try {
            ServerSocket serverSocket = new ServerSocket(port);
            System.out.println("Server started on port " + port);

            while (true) {
                Socket clientSocket = serverSocket.accept();
                System.out.println("New access accepted: " + clientSocket);

                Thread thread = new Thread(new ClientHandler(clientSocket));
                thread.start();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    static class ClientHandler implements Runnable {
        private final Socket clientSocket;

        public ClientHandler(Socket clientSocket) {
            this.clientSocket = clientSocket;
        }

        @SneakyThrows
        @Override
        public void run() {
            try {
                BufferedReader in = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
                OutputStream out = clientSocket.getOutputStream();

                String request = in.readLine();
                System.out.println("New request: " + request);

                if (request.startsWith("OPTIONS")) {
                    sendOptionsResponse(out);
                } else if (request.startsWith("GET")) {
                    String response = objectMapper.writeValueAsString(adminLimits);
                    sendResponse(out, response);
                } else if (request.startsWith("PUT")) {
                    StringBuilder requestBody = new StringBuilder();
                    int contentLength = 0;

                    String line;
                    while ((line = in.readLine()) != null && !line.isEmpty()) {
                        if (line.startsWith("Content-Length: ")) {
                            contentLength = Integer.parseInt(line.substring(16));
                        }
                    }

                    for (int i = 0; i < contentLength; i++) {
                        requestBody.append((char) in.read());
                    }

                    Limits newLimits = objectMapper.readValue(requestBody.toString(), Limits.class);
                    updateAdminLimits(newLimits);

                    String response = "Updated admin limits.";
                    sendResponse(out, response);
                }

                in.close();
                out.close();
                clientSocket.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        private void sendResponse(OutputStream out, String response) throws IOException {
            out.write("HTTP/1.1 200 OK\r\n".getBytes());
            out.write(("Content-Type: application/json\r\n").getBytes());
            out.write(("Content-Length: " + response.length() + "\r\n").getBytes());
            out.write(("Date: " + new Date() + "\r\n").getBytes());

            // Add CORS headers
            out.write(("Access-Control-Allow-Origin: http://localhost:3000\r\n").getBytes());
            out.write(("Access-Control-Allow-Methods: GET, PUT, OPTIONS\r\n").getBytes());
            out.write(("Access-Control-Allow-Headers: Content-Type\r\n").getBytes());

            out.write("\r\n".getBytes());
            out.write(response.getBytes());
        }

        private void sendOptionsResponse(OutputStream out) throws IOException {
            out.write("HTTP/1.1 200 OK\r\n".getBytes());
            out.write(("Access-Control-Allow-Origin: http://localhost:3000\r\n").getBytes());
            out.write(("Access-Control-Allow-Methods: GET, PUT, OPTIONS\r\n").getBytes());
            out.write(("Access-Control-Allow-Headers: Content-Type\r\n").getBytes());
            out.write(("Access-Control-Max-Age: 86400\r\n").getBytes()); // Opcjonalne
            out.write("\r\n".getBytes());
        }

        private synchronized void updateAdminLimits(Limits newAdminLimits) {
            adminLimits.setReimbursementRate(newAdminLimits.getReimbursementRate());
            adminLimits.setCarRate(newAdminLimits.getCarRate());
            adminLimits.setReceipts(newAdminLimits.getReceipts());
            adminLimits.setReimbursementLimit(newAdminLimits.getReimbursementLimit());
            adminLimits.setDistanceLimit(newAdminLimits.getDistanceLimit());
            adminLimits.setReceiptsLimit(newAdminLimits.getReceiptsLimit());
        }
    }
}
