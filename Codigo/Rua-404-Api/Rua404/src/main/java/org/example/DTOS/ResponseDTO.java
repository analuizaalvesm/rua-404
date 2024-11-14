package org.example.DTOS;

import org.example.Enum.UserRole;

public record ResponseDTO(String token, UserRole role) {

}
