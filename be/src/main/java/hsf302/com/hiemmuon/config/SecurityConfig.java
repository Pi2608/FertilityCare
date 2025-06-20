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

                        .requestMatchers(HttpMethod.GET,
                                "/api/doctors/active",
                                "/api/treatment-services/active",
                                "/api/register/customer").permitAll()

                        .requestMatchers(HttpMethod.GET,
                                "/api/doctors/all",
                                "/api/treatment-services/all").hasRole("MANAGER")

                        .requestMatchers(HttpMethod.GET,
                                "/api/doctors/id/**",
                                "/api/doctors/specification").hasAnyRole("MANAGER", "CUSTOMER")

                        .requestMatchers(HttpMethod.POST,
                                "/api/doctors",
                                "/api/treatment-services").hasRole("MANAGER")

                        .requestMatchers(HttpMethod.PUT,
                                "/api/doctors/me").hasRole("DOCTOR")

                        .requestMatchers(HttpMethod.PUT,
                                "/api/treatment-services/**").hasRole("MANAGER")

                        .requestMatchers(HttpMethod.PATCH,
                                "/api/doctors/status/**",
                                "/api/treatment-services/status/**").hasRole("MANAGER")

                        .requestMatchers(HttpMethod.GET,
                                "/api/treatment-services/**").permitAll()

                        .requestMatchers(HttpMethod.GET, "/api/admin/customers").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/customer/info").hasAnyRole("CUSTOMER", "DOCTOR")
                        .requestMatchers(HttpMethod.PUT, "/api/customer/update").hasRole("CUSTOMER")

                        .requestMatchers(HttpMethod.GET, "api/appointment-services/doctors/{doctorId}/available-schedules").hasRole("CUSTOMER")
                        .requestMatchers(HttpMethod.POST, "api/appointment-services/register/appointments").hasRole("CUSTOMER")
                        .requestMatchers(HttpMethod.POST, "api/appointment-services/appointments/reexam").hasRole("DOCTOR")
                        .requestMatchers(HttpMethod.GET, "api/appointment-services/appointments/reexam").hasRole("CUSTOMER")
                        .requestMatchers(HttpMethod.PATCH, "api/appointment-services/appointments/cancel/{appointmentId}").hasRole("CUSTOMER")
                        .requestMatchers(HttpMethod.GET, "api/appointment-services/appointments/history").hasRole("DOCTOR")
                        .requestMatchers(HttpMethod.GET, "api/appointment-services/appointments/overview").hasRole("MANAGER")
                        .requestMatchers(HttpMethod.GET, "api/login/roles").hasAnyRole("CUSTOMER","DOCTOR","ADMIN","MANAGER")



                        .requestMatchers(
                                "/swagger-ui/**",
                                "/v3/api-docs/**",
                                "/swagger-resources/**",
                                "/swagger-ui.html",
                                "/webjars/**",
                                "/v3/api-docs.yaml"
                        ).permitAll()
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        .anyRequest().authenticated()

                )
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("http://localhost:8080", "http://localhost:3000", "http://localhost:5173"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
