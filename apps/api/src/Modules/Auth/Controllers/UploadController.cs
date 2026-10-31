
using api.Modules.Auth.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Modules.Posts.Controllers;

[ApiController]
[Route("api/uploads")]
public class UploadController : ControllerBase
{
    private readonly CloudinaryService _cloudinary;
    private readonly ILogger<UploadController> _logger;

    public UploadController(
        CloudinaryService cloudinary,
        ILogger<UploadController> logger)
    {
        _cloudinary = cloudinary;
        _logger = logger;
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Upload([FromForm] IFormFile file)
    {
        if (file == null || file.Length == 0)
        {
            return BadRequest(new
            {
                message = "No valid image file was received."
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
            _logger.LogError(
                ex,
                "Image upload failed. File: {FileName}, Size: {FileSize}",
                file.FileName,
                file.Length
            );

            return StatusCode(500, new
            {
                message = "Image upload failed.",
                error = ex.Message
            });
        }
    }
}
