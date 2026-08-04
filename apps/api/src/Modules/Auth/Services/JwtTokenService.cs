using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using api.src.Modules.Auth.Entities;
using api.src.Shared.Configurations;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace api.src.Modules.Auth.Services;

public class JwtTokenService
{
    // Holds JWT configuration values (Secret, Issuer, Audience, Expiry)
    private readonly JwtSettings _jwtSettings;

    // Constructor: receives JwtSettings from dependency injection system
    public JwtTokenService(IOptions<JwtSettings> jwtSettings)
    {
        // Extract actual config values from IOptions wrapper
        _jwtSettings = jwtSettings.Value;
    }

    // Main method: generates JWT token for a given user
    public string GenerateToken(User user)
    {
        // Build list of claims (data embedded inside the token)
        var claims = new List<Claim>
        {
            // User unique ID stored as "subject" claim
            new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),

            // User email stored inside token payload
            new Claim(JwtRegisteredClaimNames.Email, user.Email),

            // User role (used for authorization like Admin/User)
            new Claim(ClaimTypes.Role, user.Role),

            // Custom claim for username (not standard JWT field)
            new Claim("username", user.Username)
        };

        // Create a symmetric security key using secret string from config
        var key = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(_jwtSettings.Secret)
        );

        // Create signing credentials using HMAC SHA256 algorithm
        // This ensures token cannot be tampered with
        var creds = new SigningCredentials(
            key,
            SecurityAlgorithms.HmacSha256
        );

        // Set expiration time of the token (current time + configured minutes)
        var expires = DateTime.UtcNow.AddMinutes(
            _jwtSettings.ExpiryMinutes
        );

        // Creating JWT token object for a user to verify claim
        var token = new JwtSecurityToken(
            issuer: _jwtSettings.Issuer,          
            audience: _jwtSettings.Audience,      
            claims: claims,                       
            expires: expires,                    
            signingCredentials: creds            
        );

        // Converting JWT object
        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}