using api.Modules.Posts.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using api.Modules.Auth.Services;
using api.Modules.Posts.Entities;

namespace api.Modules.Posts.Controllers;

[ApiController]
[Route("api/uploads")]
public class UploadController : ControllerBase
{
    private readonly CloudinaryService _cloudinary;

    public UploadController(
        CloudinaryService cloudinary)
    {
        _cloudinary = cloudinary;
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Upload(IFormFile file)
    {
        if (file == null || file.Length == 0)
        {
            return BadRequest(new
            {
                message = "Please select a valid image."
            });
        }

        try
        {
            var url = await _cloudinary.UploadImageAsync(file);

            return Ok(new
            {
                imageUrl = url
            });
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Cloudinary upload failed: {ex}");

            return StatusCode(500, new
            {
                message = "Image upload failed on the server."
            });
        }
    }
}