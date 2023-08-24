import MaksymVyduta.JavaServer;
import org.junit.jupiter.api.*;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@TestMethodOrder(OrderAnnotation.class)
public class GetAndPutTest {
        private static Thread serverThread;

        @BeforeAll
        public static void setUp() {
        serverThread = new Thread(() -> JavaServer.main(null));
        serverThread.start();


        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

        @AfterAll
        public static void tearDown() {
        serverThread.interrupt();
    }

    @Test
    @Order(1)
    public void testGetRequestBeforePut() throws IOException {
        URL url = new URL("http://localhost:8080");
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod("GET");

        int responseCode = connection.getResponseCode();
        String responseBody = readResponse(connection);

        assertEquals(200, responseCode);
        assertTrue(responseBody.contains("reimbursementRate"));
        assertTrue(responseBody.contains("carRate"));
        assertTrue(responseBody.contains("receipts"));
        assertTrue(responseBody.contains("reimbursementLimit"));
        assertTrue(responseBody.contains("distanceLimit"));
        assertTrue(responseBody.contains("receiptsLimit"));

        System.out.println("Response Body before PUT:");
        System.out.println(responseBody);
        connection.disconnect();
    }

    @Test
    @Order(2)
    public void testPutRequest() throws Exception {
        URL urlPost = new URL("http://localhost:8080");
        HttpURLConnection connection = (HttpURLConnection) urlPost.openConnection();
        connection.setRequestMethod("PUT");
        connection.setRequestProperty("Content-Type", "application/json");
        connection.setDoOutput(true);

        String requestBody = "{"
                + "\"reimbursementRate\": 20,"
                + "\"carRate\": 0.35,"
                + "\"receipts\": [\"Taxi\", \"Hotel\", \"Plane Ticket\"],"
                + "\"reimbursementLimit\": 75000.00,"
                + "\"distanceLimit\": 8000,"
                + "\"receiptsLimit\": 15"
                + "}";

        try (OutputStream os = connection.getOutputStream()) {
            byte[] input = requestBody.getBytes("utf-8");
            os.write(input, 0, input.length);
        }

        int responseCode = connection.getResponseCode();
        String responseBody = readResponse(connection);

        assertEquals(200, responseCode);
        assertTrue(responseBody.contains("Updated admin limits."));

        System.out.println("Response Body after PUT:");
        System.out.println(responseBody);
        connection.disconnect();
    }

        @Test
        @Order(3)
        public void testGetRequestAfterPut() throws Exception {
        URL urlGetAftePost = new URL("http://localhost:8080");
        HttpURLConnection   afterConnection = (HttpURLConnection) urlGetAftePost.openConnection();
        afterConnection.setRequestMethod("GET");

        int responseCode =   afterConnection.getResponseCode();
        String responseBody = readResponse(  afterConnection);

        assertEquals(200, responseCode);
        assertTrue(responseBody.contains("reimbursementRate"));
        assertTrue(responseBody.contains("carRate"));
        assertTrue(responseBody.contains("receipts"));
        assertTrue(responseBody.contains("reimbursementLimit"));
        assertTrue(responseBody.contains("distanceLimit"));
        assertTrue(responseBody.contains("receiptsLimit"));

            System.out.println("Response Body after updating a data:");
            System.out.println(responseBody);
            afterConnection.disconnect();
    }

        private String readResponse(HttpURLConnection connection) throws IOException {
        try (BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()))) {
            StringBuilder response = new StringBuilder();
            String line;
            while ((line = in.readLine()) != null) {
                response.append(line);
            }
            return response.toString();
        }
    }
    }