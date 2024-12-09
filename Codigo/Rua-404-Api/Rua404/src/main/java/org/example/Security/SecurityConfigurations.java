package org.example.Security;

import jakarta.servlet.DispatcherType;
import java.util.List;
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
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfigurations {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authorize -> authorize
                .dispatcherTypeMatchers(DispatcherType.ERROR).permitAll()
                .requestMatchers(HttpMethod.POST, "/api/management/get-code").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/management/validate-code").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/management/change-password").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/management/update-password").permitAll()
                .requestMatchers(HttpMethod.PUT, "/auth/updateUserData/{email}").permitAll()
                .requestMatchers(HttpMethod.POST, "/auth/register").permitAll()
                .requestMatchers(HttpMethod.POST, "/auth/login").permitAll()
                .requestMatchers(HttpMethod.GET, "/auth/{email}").permitAll()
                .requestMatchers(HttpMethod.GET, "/customer").permitAll()
                .requestMatchers(HttpMethod.GET, "/customer/{id}").permitAll()
                .requestMatchers(HttpMethod.PUT, "/customer/{id}").permitAll()
                .requestMatchers(HttpMethod.DELETE, "/customer/{id}").permitAll()
                .requestMatchers(HttpMethod.DELETE, "/auth/deleteByEmail/{email}").permitAll()
                .requestMatchers(HttpMethod.GET, "/hc").permitAll()
                .requestMatchers(HttpMethod.GET, "/products").permitAll()
                .requestMatchers(HttpMethod.GET, "/products/{id}").permitAll()
                .requestMatchers(HttpMethod.POST, "/products").permitAll()
                .requestMatchers(HttpMethod.PUT, "/products/{id}").permitAll()
                .requestMatchers(HttpMethod.DELETE, "/products/{id}").permitAll()
                .requestMatchers(HttpMethod.GET, "/payment").permitAll()
                .requestMatchers(HttpMethod.POST, "/carrinho").permitAll()
                .requestMatchers(HttpMethod.POST, "/carrinho/fecharCarrinho").permitAll()
                .requestMatchers(HttpMethod.GET, "/carrinho").permitAll()
                .requestMatchers(HttpMethod.PUT, "/carrinho").permitAll()
                .requestMatchers(HttpMethod.DELETE, "/carrinho").permitAll()
                .requestMatchers(HttpMethod.POST, "/orders/{usuarioId}").permitAll()
                .requestMatchers(HttpMethod.GET, "/orders").permitAll()
                .requestMatchers(HttpMethod.GET, "/orders/{id}").permitAll()
                .requestMatchers(HttpMethod.GET, "/orders/customer/{usuarioId}").permitAll()
                .requestMatchers("/swagger-ui/**", "/v3/api-docs/**", "/swagger-resources/**", "/swagger-ui.html").permitAll()
                .anyRequest().permitAll())
                .build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
            throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:5173", "https://analuizaalvesm.github.io/, https://rua-404-a2bw1zky0-ana-luiza-machados-projects.vercel.app/, https://rua-404.vercel.app/"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS")); // Métodos permitidos
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
