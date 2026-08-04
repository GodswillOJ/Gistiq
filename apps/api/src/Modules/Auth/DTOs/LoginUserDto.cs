namespace api.src.Modules.Auth.DTOs;

public class LoginUserDto
{
    public required string Email { get; set; }

    public required string Password { get; set; }
}