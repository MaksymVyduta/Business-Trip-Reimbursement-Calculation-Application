package MaksymVyduta;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Arrays;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class Limits {
    private double reimbursementRate = 15;
    private double carRate = 0.3;
    private List<String> receipts = Arrays.asList("Taxi", "Hotel", "Plane Ticket", "Food");
    private double reimbursementLimit = 50000.00;
    private double distanceLimit = 5000;
    private double receiptsLimit = 10;
}
