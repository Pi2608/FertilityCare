package hsf302.com.hiemmuon.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponse<T> {
    private int status;
    private String message;
    private T data;
}