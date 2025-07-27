package hsf302.com.hiemmuon.exception;

import com.fasterxml.jackson.databind.exc.InvalidFormatException;
import hsf302.com.hiemmuon.dto.ApiResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.nio.file.AccessDeniedException;
import java.util.stream.Collectors;

@Slf4j
@ControllerAdvice
public class HandlerException {

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ApiResponse<?>> handleNotFoundException(NotFoundException ex) {
        ApiResponse<?> response = new ApiResponse<>(
                404,
                ex.getMessage(),
                null);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ApiResponse<?>> handleTypeMismatch(MethodArgumentTypeMismatchException ex) {
        ApiResponse<?> response = new ApiResponse<>(
                400,
                "Sai kiểu dữ liệu truyền vào: " + ex.getMessage(),
                null);
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<?>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        String errorMessages = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(error -> error.getDefaultMessage())
                .collect(Collectors.joining("; "));

        ApiResponse<?> response = new ApiResponse<>(
                400,
                errorMessages,
                null);
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<?>> handleGenericException(Exception ex) {
        ApiResponse<?> response = new ApiResponse<>(
                500,
                "Lỗi hệ thống: " + ex.getMessage(),
                null);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ApiResponse<?>> handleAccessDenied(AccessDeniedException ex) {
        ApiResponse<?> response = new ApiResponse<>(
                403,
                "Bạn không có quyền truy cập chức năng này.",
                null
        );
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
    }

    @ExceptionHandler(MissingServletRequestParameterException.class)
    public ResponseEntity<ApiResponse<?>> handleMissingParam(MissingServletRequestParameterException ex) {
        ApiResponse<?> response = new ApiResponse<>(
                400,
                "Thiếu tham số bắt buộc: " + ex.getParameterName(),
                null
        );
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ApiResponse<?>> handleJsonParseError(HttpMessageNotReadableException ex) {
        String message = "Dữ liệu JSON không đọc được.";

        // Nếu là lỗi do enum không parse được
        if (ex.getCause() instanceof InvalidFormatException formatException) {
            var targetType = formatException.getTargetType();
            var value = formatException.getValue();

            message = "Lỗi khi chuyển giá trị [" + value + "] sang kiểu " + targetType.getSimpleName();
        }

        ex.printStackTrace(); // in ra console

        return ResponseEntity.badRequest().body(new ApiResponse<>(
                400,
                message,
                null
        ));
    }
}