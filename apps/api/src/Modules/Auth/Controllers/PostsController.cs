using api.Modules.Auth.Services;
using api.Modules.Posts.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Modules.Posts.Controllers;

[ApiController]
[Route("api/posts")]
public class PostsController : ControllerBase
{
    private readonly IPostService _postService;

    public PostsController(
        IPostService postService
    )
    {
        _postService = postService;
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> CreatePost(
        [FromBody] CreatePostDto dto
    )
    {
        var post =
            await _postService.CreatePostAsync(
                dto,
                User
            );

        return Ok(post);
    }

    [HttpGet]
    public async Task<IActionResult> GetPosts()
    {
        var posts =
            await _postService.GetPostsAsync();

        return Ok(posts);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetPost(
        Guid id
    )
    {
        var post =
            await _postService.GetPostByIdAsync(
                id
            );

        if (post == null)
        {
            return NotFound();
        }

        return Ok(post);
    }

    [HttpGet("trending")]
    public async Task<IActionResult> GetTrendingPosts()
    {
        var posts = await _postService.GetTrendingPostsAsync();

        return Ok(posts);
    }

    [HttpGet("featured")]
    public async Task<IActionResult> GetFeaturedPosts()
    {
        var posts = await _postService.GetFeaturedPostsAsync();

        return Ok(posts);
    }

    [HttpGet("breaking")]
    public async Task<IActionResult> GetBreakingPosts()
    {
        var posts = await _postService.GetBreakingPostsAsync();

        return Ok(posts);
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> UpdatePost(
        Guid id,
        [FromBody] CreatePostDto dto
    )
    {
        try
        {
            var post =
                await _postService.UpdatePostAsync(
                    id,
                    dto
                );

            if (post == null)
            {
                return NotFound();
            }

            return Ok(post);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new
            {
                message = ex.Message,
                inner = ex.InnerException?.Message
            });
        }
    }
    
    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> DeletePost(
        Guid id
    )
    {
        var deleted =
            await _postService.DeletePostAsync(
                id
            );

        if (!deleted)
        {
            return NotFound();
        }

        return Ok(new
        {
            success = true
        });
    }

    [HttpGet("slug/{slug}")]
    public async Task<IActionResult> GetBySlug(
        string slug
    )
    {
        var post =
            await _postService
                .GetBySlugAsync(slug);

        if (post == null)
            return NotFound();

        return Ok(post);
    }
}