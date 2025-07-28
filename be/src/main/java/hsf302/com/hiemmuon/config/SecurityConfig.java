package hsf302.com.hiemmuon.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/login/**").permitAll()


                        // Customer APIs
                        .requestMatchers(HttpMethod.POST, "/api/register/request", "/api/register/confirm").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/admin/customers").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/customer/info").hasRole("CUSTOMER")
                        .requestMatchers(HttpMethod.PUT, "/api/customer/update").hasRole("CUSTOMER")

                        //Cycle APIs
                        .requestMatchers(HttpMethod.GET, "/api/cycles/meC/cycle/all").hasRole("CUSTOMER")
                        .requestMatchers(HttpMethod.POST, "/api/cycles/create").hasRole("DOCTOR")
                        .requestMatchers(HttpMethod.GET, "/api/cycles/meD/cycle/all").hasRole("DOCTOR")
                        .requestMatchers(HttpMethod.GET, "/api/cycles/current-cycle/*").hasAnyRole("DOCTOR", "CUSTOMER")
                        .requestMatchers(HttpMethod.PATCH, "/api/cycles/cycleId/*/note").hasRole("DOCTOR")

                        // Doctor Apis
                        .requestMatchers(HttpMethod.GET, "/api/doctors/all").hasAnyRole("ADMIN", "MANAGER")
                        .requestMatchers(HttpMethod.GET, "/api/doctors/id/*").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/doctors/name/*").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/doctors/active").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/doctors").hasAnyRole("ADMIN", "MANAGER")
                        .requestMatchers(HttpMethod.PATCH, "/api/doctors/*/status").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/doctors/me").hasRole("DOCTOR")
                        .requestMatchers(HttpMethod.PUT, "/api/doctors/me").hasRole("DOCTOR")

                        // Medicine APIs
                        .requestMatchers(HttpMethod.GET, "/api/medicine/cycles/{cycleId}/steps/{stepOrder}/medicine-schedules").hasAnyRole("CUSTOMER", "DOCTOR")
                        .requestMatchers(HttpMethod.GET, "/api/medicine/cycles/{cycleId}/steps/{stepOrder}/medicine-schedules/by-date").hasAnyRole("CUSTOMER", "DOCTOR")
                        .requestMatchers(HttpMethod.GET, "/api/medicine/customer/{customerId}").hasAnyRole("CUSTOMER", "DOCTOR")
                        .requestMatchers(HttpMethod.POST, "/api/medicine/medication-schedule").hasRole("DOCTOR")
                        .requestMatchers(HttpMethod.PATCH, "/api/medicine/medicine-schedules/{scheduleId}").hasRole("CUSTOMER")


                        //CycleStep APIs
                        .requestMatchers(HttpMethod.GET, "/api/cycle-steps/cycleId/*/step/all").hasAnyRole("CUSTOMER", "DOCTOR")
                        .requestMatchers(HttpMethod.GET, "/api/cycle-steps/cycleId/*/step/*").hasAnyRole("CUSTOMER", "DOCTOR")
                        .requestMatchers(HttpMethod.GET, "/api/cycle-steps/*/details(note,test,medician)").hasAnyRole("CUSTOMER", "DOCTOR")
                        .requestMatchers(HttpMethod.PATCH, "/api/cycle-steps/cycleId/*/step/*/status").hasRole("DOCTOR")
                        .requestMatchers(HttpMethod.PATCH, "/api/cycle-steps/cycleId/*/step/*/note").hasRole("DOCTOR")


                        // Appointment Services APIs
                        .requestMatchers(HttpMethod.GET, "api/appointment-services/doctors/{doctorId}/available-schedules").hasRole("CUSTOMER")
                        .requestMatchers(HttpMethod.POST, "api/appointment-services/register/appointments").hasRole("CUSTOMER")
                        .requestMatchers(HttpMethod.POST, "api/appointment-services/appointments/reexam").hasRole("DOCTOR")
                        .requestMatchers(HttpMethod.GET, "api/appointment-services/appointments/reexam").hasRole("CUSTOMER")
                        .requestMatchers(HttpMethod.PATCH, "api/appointment-services/appointments/cancel/{appointmentId}").hasRole("CUSTOMER")
                        .requestMatchers(HttpMethod.GET, "api/appointment-services/appointments/history").hasRole("DOCTOR")
                        .requestMatchers(HttpMethod.GET, "api/appointment-services/appointments/overview").hasAnyRole("MANAGER", "ADMIN")
                        .requestMatchers(HttpMethod.GET, "api/login/roles").hasAnyRole("CUSTOMER", "DOCTOR", "ADMIN", "MANAGER")
                        .requestMatchers(HttpMethod.PATCH, "api/appointment-services/appointments/{appointmentId}/update-service").hasRole("DOCTOR")
                        .requestMatchers(HttpMethod.GET, "api/appointment-services/appointments/detail").hasAnyRole("CUSTOMER", "DOCTOR")


                        // Test Result APIs
                        .requestMatchers(HttpMethod.POST, "api/test-results/create").hasAnyRole("DOCTOR")
                        .requestMatchers(HttpMethod.GET, "api/test-results/step/{stepId}").hasAnyRole("CUSTOMER", "DOCTOR")
                        .requestMatchers(HttpMethod.GET, "api/test-results/customer").hasAnyRole("CUSTOMER")
                        .requestMatchers(HttpMethod.GET, "api/test-results/customerId").hasAnyRole("DOCTOR")
                        .requestMatchers(HttpMethod.PUT, "api/test-results/update/{id}").hasAnyRole("DOCTOR")


                        // TreatmentServiceController
                        .requestMatchers(HttpMethod.GET, "/api/treatment-services/all").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/treatment-services/id/*").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/treatment-services/name/*").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/treatment-services/active").permitAll()
                        .requestMatchers(HttpMethod.PATCH, "/api/treatment-services/*/status").hasAnyRole("ADMIN", "MANAGER")
                        .requestMatchers(HttpMethod.POST, "/api/treatment-services").hasAnyRole("ADMIN", "MANAGER")
                        .requestMatchers(HttpMethod.PUT, "/api/treatment-services/*").hasAnyRole("ADMIN", "MANAGER")

                        .requestMatchers(HttpMethod.POST, "/api/service-steps/service/{serviceId}").hasAnyRole("ADMIN", "MANAGER")
                        .requestMatchers(HttpMethod.PUT, "/api/service-steps/{stepId}").hasAnyRole("ADMIN", "MANAGER")
                        .requestMatchers(HttpMethod.GET, "/api/service-steps/{serviceId}").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/service-steps/{serviceId}/step-order/{step-order}").permitAll()

                        .requestMatchers(HttpMethod.GET, "/api/success-rates/{id}").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/success-rates/service/{serviceId}").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/success-rates").hasAnyRole("ADMIN", "MANAGER")
                        .requestMatchers(HttpMethod.PUT, "/api/success-rates/{id}").hasAnyRole("ADMIN", "MANAGER")
                        .requestMatchers(HttpMethod.DELETE, "/api/success-rates/{id}").hasAnyRole("ADMIN", "MANAGER")

                        //

                        // Feedback
                        .requestMatchers(HttpMethod.POST, "api/feedback/create").hasAnyRole("CUSTOMER")
                        .requestMatchers(HttpMethod.GET, "api/feedback/averagi-rating/{doctorId}").hasAnyRole("MANAGER", "ADMIN")
                        .requestMatchers(HttpMethod.GET, "api/feedback/feedback-by-doctor/{doctorId}").hasAnyRole("MANAGER", "ADMIN")
                        .requestMatchers(HttpMethod.GET, "api/feedback/feedback-by-customer/{customerId}").hasAnyRole("CUSTOMER")
                        .requestMatchers(HttpMethod.GET, "api/feedback/feedback-by-customer-and-doctor/{customerId}/{doctorId}").hasAnyRole("ADMIN", "MANAGER")
                        .requestMatchers(HttpMethod.PUT, "api/feedback/{id}").hasAnyRole("ADMIN", "MANAGER")
                        .requestMatchers(HttpMethod.DELETE, "api/feedback/{id}").hasAnyRole("ADMIN", "MANAGER")
                        .requestMatchers(HttpMethod.GET, "api/feedback").permitAll()


                        // Report
                        .requestMatchers(HttpMethod.GET, "api/reports/accounts").hasAnyRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "api/reports/revenue").hasAnyRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "api/reports/users/summary").hasAnyRole("ADMIN")

                        //

                        // Message
                        .requestMatchers(HttpMethod.GET, "api/messages/all").hasAnyRole("CUSTOMER", "DOCTOR")
                        .requestMatchers(HttpMethod.POST, "api/messages/send").hasAnyRole("CUSTOMER", "DOCTOR")
                        .requestMatchers(HttpMethod.GET, "api/messages/latest").hasAnyRole("CUSTOMER", "DOCTOR")

                        // Blog
                        .requestMatchers("/api/blogs/**").permitAll()

                        /// Payment APIs
                        .requestMatchers(HttpMethod.GET, "/api/payments/all").hasAnyRole("ADMIN", "MANAGER")
                        .requestMatchers(HttpMethod.GET,
                                "/api/payments/customer",
                                "/api/payments/pending/customer"
                        ).hasRole("CUSTOMER")
                        .requestMatchers(HttpMethod.POST,
                                "/api/payments/"
                        ).hasRole("DOCTOR")
                        .requestMatchers(HttpMethod.POST,
                                "/api/payments/vnpay"
                        ).hasRole("CUSTOMER")
                        .requestMatchers(HttpMethod.PUT,
                                "/api/payments/cancel"
                        ).hasRole("CUSTOMER")
                        .requestMatchers(HttpMethod.GET, "/api/payments/vnpay-callback").permitAll()

                        .requestMatchers(
                                "/swagger-ui/**",
                                "/v3/api-docs/**",
                                "/swagger-resources/**",
                                "/swagger-ui.html",
                                "/webjars/**",
                                "/v3/api-docs.yaml")
                        .permitAll()
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        .anyRequest().authenticated()

                )
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(
                List.of("http://localhost:8080", "http://localhost:3000", "http://localhost:5173"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}