using System.Security.Claims;
using api.Modules.Posts.DTOs;
using api.Modules.Posts.Entities;

namespace api.Modules.Auth.Services;

public interface IPostService
{
    // CREATE
    Task<Post> CreatePostAsync(
        CreatePostDto dto,
        ClaimsPrincipal user
    );

    // READ
    Task<List<Post>> GetPostsAsync();
    
    Task<List<Post>> GetTrendingPostsAsync();

    Task<List<Post>> GetFeaturedPostsAsync();

    Task<List<Post>> GetBreakingPostsAsync();

    Task<Post?> GetPostByIdAsync(
        Guid id
    );

    Task<Post?> GetBySlugAsync(
        string slug
    );

    // UPDATE
    Task<Post?> UpdatePostAsync(
        Guid id,
        CreatePostDto dto
    );

    // DELETE
    Task<bool> DeletePostAsync(
        Guid id
    );
}