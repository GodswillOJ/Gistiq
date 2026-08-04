using api.src.Modules.Auth.DTOs;
using api.src.Modules.Auth.Entities;
using api.src.Modules.Auth.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace api.src.Modules.Auth.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly ApplicationDbContext _db;
    private readonly JwtTokenService _jwtTokenService;

    public AuthController(
        ApplicationDbContext db,
        JwtTokenService jwtTokenService
    )
    {
        _db = db;
        _jwtTokenService = jwtTokenService;
    }

    private void SetAuthCookie(string token)
    {
        Response.Cookies.Append("token", token, new CookieOptions
        {
            HttpOnly = true,
            Secure = false, // set false only in localhost if needed
            SameSite = SameSiteMode.Lax,
            Expires = DateTime.UtcNow.AddMinutes(60),
            Path = "/"
        });
    }

    [HttpPost("register")]
    public async Task<ActionResult> Register(RegisterUserDto dto)
    {
        // CHECK IF EMAIL EXISTS
        var emailExists = await _db.Users
            .AnyAsync(x => x.Email == dto.Email);

        if (emailExists)
        {
            return BadRequest(new
            {
                message = "Email already exists"
            });
        }

        // CHECK IF USERNAME EXISTS
        var usernameExists = await _db.Users
            .AnyAsync(x => x.Username == dto.Username);

        if (usernameExists)
        {
            return BadRequest(new
            {
                message = "Username already exists"
            });
        }

        // CREATE USER
        var user = new User
        {
            Id = Guid.NewGuid(),
            Username = dto.Username,
            Email = dto.Email,

            // HASH PASSWORD
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),

            // DEFAULT ROLE
            Role = "User",

            CreatedAt = DateTime.UtcNow
        };

        // SAVE USER
        _db.Users.Add(user);

        await _db.SaveChangesAsync();

        // GENERATE JWT TOKEN
        var token = _jwtTokenService.GenerateToken(user);

        SetAuthCookie(token);

        return Ok(new
        {
            message = "User registered successfully",
            data = new
            {
                user.Id,
                user.Username,
                user.Email,
                user.Role
            }
        });
    }

    [HttpPost("login")]
    public async Task<ActionResult> Login(LoginUserDto dto)
    {
        // FIND USER BY EMAIL
        var user = await _db.Users
            .FirstOrDefaultAsync(u => u.Email == dto.Email);

        // BLOCK INVALID USER
        if (user == null)
        {
            return Unauthorized(new
            {
                message = "Invalid credentials"
            });
        }

        // VERIFY PASSWORD
        var isPasswordValid = BCrypt.Net.BCrypt.Verify(
            dto.Password,
            user.PasswordHash
        );

        // BLOCK INVALID PASSWORD
        if (!isPasswordValid)
        {
            return Unauthorized(new
            {
                message = "Invalid credentials"
            });
        }

        // BLOCK DEACTIVATED USERS
        if (!user.IsActive)
        {
            return Unauthorized(new
            {
                message = "Account has been deactivated"
            });
        }

        // GENERATE JWT TOKEN
        var token = _jwtTokenService.GenerateToken(user);

        SetAuthCookie(token);

        return Ok(new
        {
            message = "Login successful",
            data = new
            {
                user.Id,
                user.Username,
                user.Email,
                user.Role
            }
        });
    }
    
    // Admin-only endpoints for user management 
    [HttpPost("admin/login")]
    public async Task<ActionResult> AdminLogin(
        LoginUserDto dto
    )
    {
        var user = await _db.Users
            .FirstOrDefaultAsync(
                x => x.Email == dto.Email
            );

        if (user == null)
        {
            return Unauthorized(new
            {
                message = "Invalid credentials"
            });
        }

        var validPassword =
            BCrypt.Net.BCrypt.Verify(
                dto.Password,
                user.PasswordHash
            );

        if (!validPassword)
        {
            return Unauthorized(new
            {
                message = "Invalid credentials"
            });
        }

        if (user.Role != "Admin")
        {
            return Unauthorized(new
            {
                message = "Admin access only"
            });
        }

        var token = _jwtTokenService.GenerateToken(user);

        SetAuthCookie(token);

        return Ok(new
        {
            message = "Admin login successful",
            data = new
            {
                user.Id,
                user.Username,
                user.Email,
                user.Role
            }
        });
    }

    // Additional admin endpoints 
    [Authorize]
    [HttpGet("me")]
    public async Task<ActionResult> Me()
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (userId == null)
        {
            return Unauthorized();
        }

        var user = await _db.Users.FindAsync(Guid.Parse(userId));

        if (user == null)
        {
            return Unauthorized();
        }

        return Ok(new
        {
            user.Id,
            user.Username,
            user.Email,
            user.Role
        });
    }

    [HttpPost("logout")]
    public IActionResult Logout()
    {
        Response.Cookies.Delete("token", new CookieOptions
        {
            Path = "/"
        });

        return Ok(new
        {
            message = "Logged out successfully"
        });
    }
}