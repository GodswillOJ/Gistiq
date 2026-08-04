// namespace api.Modules.Posts.DTOs;

// public class CreatePostDto
// {
//     public string Title { get; set; } = string.Empty;

//     public string Slug { get; set; } = string.Empty;

//     public string Subtitle { get; set; } = string.Empty;

//     public string Excerpt { get; set; } = string.Empty;

//     public string FeaturedImage { get; set; } = string.Empty;

//     public string Category { get; set; } = string.Empty;

//     public List<ContentBlockDto> ContentBlocks { get; set; } = [];

//     public string SeoTitle { get; set; } = string.Empty;

//     public string SeoDescription { get; set; } = string.Empty;

//     public List<string> Tags { get; set; } = [];

//     public string Author { get; set; } = string.Empty;

//     public DateTime? PublishedAt { get; set; }

//     public PostStatus Status { get; set; } = PostStatus.Draft;
// }

using api.Modules.Posts.Entities;

namespace api.Modules.Posts.DTOs;

public class CreatePostDto
{
    // =========================
    // BASIC INFORMATION
    // =========================

    public string Title { get; set; } = string.Empty;

    public string Slug { get; set; } = string.Empty;

    public string Subtitle { get; set; } = string.Empty;

    public string Excerpt { get; set; } = string.Empty;

    public string FeaturedImage { get; set; } = string.Empty;

    public string Category { get; set; } = string.Empty;

    // =========================
    // ARTICLE CONTENT
    // =========================

    public List<ContentBlockDto> ContentBlocks { get; set; } = [];

    // =========================
    // SEO
    // =========================

    public string SeoTitle { get; set; } = string.Empty;

    public string SeoDescription { get; set; } = string.Empty;

    public List<string> Tags { get; set; } = [];

    // =========================
    // PUBLISHING
    // =========================

    public PostStatus Status { get; set; } = PostStatus.Draft;

    public DateTime? PublishedAt { get; set; }

    public bool IsFeatured { get; set; }

    public bool IsTrending { get; set; }

    public bool IsBreaking { get; set; }
}