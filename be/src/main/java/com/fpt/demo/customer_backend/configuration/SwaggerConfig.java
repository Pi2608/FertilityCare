package com.fpt.demo.customer_backend.configuration;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
        info = @Info(
            title = "Customer Backend API",
            version ="1.0.0",
            description = "API for managing customers and authentication"
        )
)
public class SwaggerConfig {

}
