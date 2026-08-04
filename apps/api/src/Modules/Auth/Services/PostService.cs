using api.Modules.Posts.DTOs;
using api.Modules.Posts.Entities;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;
using System.Security.Claims;

namespace api.Modules.Auth.Services;

public class PostService : IPostService
{
    private readonly ApplicationDbContext _context;

    public PostService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Post> CreatePostAsync(CreatePostDto dto, ClaimsPrincipal user)
    {
        var userEmail = user.FindFirst(ClaimTypes.Email)?.Value;
        var role = user.FindFirst(ClaimTypes.Role)?.Value;

        var post = new Post
        {
            Id = Guid.NewGuid(),
            Title = dto.Title,
            Slug = GenerateSlug(dto.Title),
            Subtitle = dto.Subtitle,
            Excerpt = dto.Excerpt,
            FeaturedImage = dto.FeaturedImage,
            Category = dto.Category,
            SeoTitle = dto.SeoTitle,
            SeoDescription = dto.SeoDescription,
            Tags = dto.Tags,
            Author = userEmail ?? "Unknown",

            Status = dto.Status,
            PublishedAt = dto.Status == PostStatus.Published
                ? DateTime.UtcNow
                : null,

            IsFeatured = dto.IsFeatured,
            IsTrending = dto.IsTrending,
            IsBreaking = dto.IsBreaking,

            ContentBlocks = dto.ContentBlocks.Select(x => new ContentBlock
            {
                Id = Guid.NewGuid(),
                Type = x.Type,
                Content = x.Content
            }).ToList()
        };

        _context.Posts.Add(post);
        await _context.SaveChangesAsync();

        return post;
    }

    public async Task<List<Post>> GetPostsAsync()
    {
        // To avoid returning unpublished posts, we filter by Status == Published
        return await _context.Posts
            .Include(x => x.ContentBlocks)
            .Where(x => x.Status == PostStatus.Published)
            .OrderByDescending(x => x.PublishedAt)
            .ToListAsync();
    }

    public async Task<List<Post>> GetTrendingPostsAsync()
    {
        return await _context.Posts
            .Include(p => p.ContentBlocks)
            .Where(p => p.Status == PostStatus.Published)
            .OrderByDescending(p => p.IsBreaking)
            .ThenByDescending(p => p.IsTrending)
            .ThenByDescending(p => p.Views)
            .ThenByDescending(p => p.PublishedAt)
            .Take(5)
            .ToListAsync();
    }

    public async Task<List<Post>> GetFeaturedPostsAsync()
    {
        return await _context.Posts
            .Include(x => x.ContentBlocks)
            .Where(x =>
                x.Status == PostStatus.Published &&
                x.IsFeatured)
            .OrderByDescending(x => x.PublishedAt)
            .Take(5)
            .ToListAsync();
    }

    public async Task<List<Post>> GetBreakingPostsAsync()
    {
        return await _context.Posts
            .Include(x => x.ContentBlocks)
            .Where(x =>
                x.Status == PostStatus.Published &&
                x.IsBreaking)
            .OrderByDescending(x => x.PublishedAt)
            .Take(5)
            .ToListAsync();
    }
    public async Task<Post?> GetPostByIdAsync(Guid id)
    {
        return await _context.Posts
            .Include(x => x.ContentBlocks)
            .FirstOrDefaultAsync(x => x.Id == id);
    }

    public async Task<Post?> UpdatePostAsync(Guid id, CreatePostDto dto)
    {
        var post = await _context.Posts
            .Include(x => x.ContentBlocks)
            .FirstOrDefaultAsync(x => x.Id == id);

        if (post == null)
            return null;

        post.Title = dto.Title;
        post.Subtitle = dto.Subtitle;
        post.Excerpt = dto.Excerpt;
        post.FeaturedImage = dto.FeaturedImage;
        post.Category = dto.Category;
        post.SeoTitle = dto.SeoTitle;
        post.SeoDescription = dto.SeoDescription;
        post.Tags = dto.Tags;
        post.Status = dto.Status;

        post.IsFeatured = dto.IsFeatured;

        post.IsTrending = dto.IsTrending;

        post.IsBreaking = dto.IsBreaking;
        if (dto.Status == PostStatus.Published &&
            post.PublishedAt == null)
        {
            post.PublishedAt = DateTime.UtcNow;
        }
        post.UpdatedAt = DateTime.UtcNow;

        foreach (var dtoBlock in dto.ContentBlocks)
        {
            // EXISTING BLOCK
            if (dtoBlock.Id.HasValue)
            {
                var existingBlock = post.ContentBlocks
                    .FirstOrDefault(x => x.Id == dtoBlock.Id.Value);

                if (existingBlock != null)
                {
                    existingBlock.Type = dtoBlock.Type;
                    existingBlock.Content = dtoBlock.Content;
                }
            }
            else
            {
                // NEW BLOCK
                post.ContentBlocks.Add(new ContentBlock
                {
                    Id = Guid.NewGuid(),
                    Type = dtoBlock.Type,
                    Content = dtoBlock.Content,
                    PostId = post.Id
                });
            }
        }

        await _context.SaveChangesAsync();

        return post;
    }

    public async Task<bool> DeletePostAsync(Guid id)
    {
        var post = await _context.Posts
            .Include(x => x.ContentBlocks)
            .FirstOrDefaultAsync(x => x.Id == id);

        if (post == null)
        {
            return false;
        }

        _context.ContentBlocks.RemoveRange(post.ContentBlocks);
        _context.Posts.Remove(post);

        await _context.SaveChangesAsync();

        return true;
    }

    // =========================
    // ✅ NEW METHOD ADDED ONLY
    // =========================
    public async Task<Post?> GetBySlugAsync(string slug)
    {
        if (string.IsNullOrWhiteSpace(slug))
            return null;

        slug = slug.Trim().ToLower();

        var post = await _context.Posts
            .Include(x => x.ContentBlocks)
            .FirstOrDefaultAsync(x =>
                x.Slug.Trim().ToLower() == slug);

        if (post == null)
            return null;

        post.Views++;

        await _context.SaveChangesAsync();

        return post;
    }

    private string GenerateSlug(string title)
    {
        var slug = title.ToLower();
        slug = Regex.Replace(slug, @"[^a-z0-9\s-]", "");
        slug = Regex.Replace(slug, @"\s+", "-");
        return slug;
    }

}